import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import warnings

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix, roc_curve, roc_auc_score
from sklearn.cluster import KMeans

from tensorflow.keras.models import Model
from tensorflow.keras.layers import Dense, Input
import pickle

warnings.filterwarnings("ignore")

# Load dataset
df = pd.read_csv('Dataset/survey.csv')

df['GENDER'] = df['GENDER'].replace(['M', 'F'], [0, 1])
df['LUNG_CANCER'] = df['LUNG_CANCER'].replace(['YES', 'NO'], [1, 0])

# Data visualization
plt.figure()
df.groupby('LUNG_CANCER')['LUNG_CANCER'].count().plot.bar()
plt.show()

sns.pairplot(df, hue='LUNG_CANCER')
plt.show()

plt.figure(figsize=(15, 15))
sns.heatmap(df.corr(), annot=True, cmap='Blues', fmt='.1f')
plt.show()

# Prepare data for training
X = df.drop(['LUNG_CANCER'], axis=1)
y = df['LUNG_CANCER']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Feature Scaling
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Save scaler
with open('model/scaler.pkl', 'wb') as f:
    pickle.dump(scaler, f)

# Build ANN model using Functional API
inputs = Input(shape=(15,))
x = Dense(6, activation='relu')(inputs)
x = Dense(6, activation='relu')(x)
outputs = Dense(1, activation='sigmoid')(x)

model = Model(inputs=inputs, outputs=outputs)

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
history = model.fit(X_train, y_train, batch_size=10, epochs=100, verbose=0)

# Save model
model.save('model/lung_cancer_model.h5')

# Evaluate model
score, acc = model.evaluate(X_train, y_train, batch_size=10, verbose=0)
print('Train accuracy:', acc)

score, acc = model.evaluate(X_test, y_test, batch_size=10, verbose=0)
print('Test accuracy:', acc)

# Predictions
y_pred = model.predict(X_test, verbose=0)
y_pred = (y_pred > 0.5)

# Confusion matrix
plt.figure()
cm = confusion_matrix(y_test, y_pred)
sns.heatmap(pd.DataFrame(cm), annot=True, cmap="YlGnBu", fmt="g")
plt.title('Confusion matrix')
plt.ylabel('Actual label')
plt.xlabel('Predicted label')
plt.show()

# Classification report
print(classification_report(y_test, y_pred))

# ROC Curve
plt.figure()
y_pred_proba = model.predict(X_test, verbose=0)
fpr, tpr, thresholds = roc_curve(y_test, y_pred_proba)
plt.plot([0,1],[0,1],'k--')
plt.plot(fpr, tpr, label='ANN')
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.title('ROC curve')
plt.legend()
plt.show()

print('ROC AUC Score:', roc_auc_score(y_test, y_pred_proba))

# Clustering for positive cases
df_cancer = df[df['LUNG_CANCER'] == 1].drop('LUNG_CANCER', axis=1)
df_cancer_scaled = scaler.transform(df_cancer)

# Finding optimal clusters using Elbow Method
distortions = []
for i in range(1, 15):
    km = KMeans(n_clusters=i, init='k-means++', n_init=10, max_iter=300, random_state=0)
    km.fit(df_cancer_scaled)
    distortions.append(km.inertia_)

plt.figure()
plt.plot(range(1, 15), distortions, marker='o')
plt.xlabel('Number of clusters')
plt.ylabel('Distortion')
plt.show()

# Applying KMeans with 5 clusters
kmeans_model = KMeans(n_clusters=5, random_state=10).fit(df_cancer_scaled)
df_cancer['cluster'] = kmeans_model.labels_

# Cluster visualization
fig = plt.figure(figsize=(10, 20))
num_list = df_cancer.columns[:-1]

for i in range(len(num_list)):
    plt.subplot(6, 3, i + 1)
    plt.title(num_list[i])
    sns.histplot(data=df_cancer, y=df_cancer[num_list[i]], hue='cluster')

plt.tight_layout()
plt.show()

print("Model and scaler saved successfully!")
