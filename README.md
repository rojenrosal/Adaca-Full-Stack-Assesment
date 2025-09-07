# I. Coding Challenge


# Task: Patient Management Dashboard Prototype


A responsive patient management dashboard built with **React**, **TypeScript**, **Apollo Client (GraphQL)**, and **TailwindCSS**. This app allows doctors and staff to view, search, add, and manage patient records easily in a clean UI.

-----

## ✨ Features

  * **📋 Patient Management** – View patients with name, age, gender, and condition.
  * **🔍 Search & Filter** – Quickly find patients by name.
  * **➕ Add New Patients** – Add patient records via a modal form.
  * **⏭ Pagination** – Navigate through patient lists with ease.
  * **🎨 Modern UI** – Styled with TailwindCSS and icons from Lucide.

-----

## 🛠️ Tech Stack

  * **React** (functional components + hooks)
  * **Apollo Client** (GraphQL queries & mutations)
  * **TailwindCSS** (styling & responsive design)
  * **Lucide Icons** (modern SVG icons)
  * **Mock GraphQL API** (using Apollo mockLink for demo data)

-----

## 📂 Project Structure

```
src/
│── components/       # UI components (tables, inputs, modals, etc.)
│   ├── table/        # PatientTable + PaginationControls
│   ├── form-modal/   # AddPatientModal
│   ├── Feedback.tsx  # Loading & Error states
│   ├── SearchInput.tsx
│   └── PatientManagement.tsx
│
│── graphql/          # GraphQL queries, mutations, and types
│   ├── patients.ts   # GET_PATIENTS, ADD_PATIENT
│   └── mockLink.ts   # Mock Apollo Link for local data
│
│── layouts/          # Layout components (DashboardLayout)
│── pages/            # Page-level components (PatientsPage)
│── App.tsx           # Root app entry with ApolloProvider
│── index.css         # TailwindCSS setup
```

-----

## 🚀 Getting Started

1.  **Clone the repo**

    ```bash
    git clone https://github.com/rojenrosal/Adaca-Full-Stack-Assesment.git
    cd Adaca-Full-Stack-Assesment
    ```

2.  **Install dependencies**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Start the dev server**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

App runs at 👉 http://localhost:3000



## Screen Shots
**Default View**
<img width="1440" height="779" alt="page" src="https://github.com/user-attachments/assets/c431cd3a-22a4-4b64-b570-1154be9f94ef" />
**Form View**
<img width="1440" height="771" alt="form" src="https://github.com/user-attachments/assets/686df85e-a447-4bb9-899e-57e94a0cf2a3" />
**Added View**
<img width="1440" height="778" alt="added" src="https://github.com/user-attachments/assets/05987f32-464e-41b9-876b-fbfea946bd25" />

---
# II. System Design


# Scenario: Design a high-level architecture for a telehealth platform that supports:
  * Video consultations
  * Patient record management
  * Secure authentication
  * Scalability for 100,000+ concurrent users


**Architectural Diagram**
<img width="959" height="634" alt="Screenshot 2025-09-08 at 3 58 11 AM" src="https://github.com/user-attachments/assets/15685424-0302-45f9-9cde-ea29cb094d40" />
---
Link: https://drive.google.com/file/d/1H0QhRyGEHkG-ZDuC9fAXSgKYgQpCGnlf/view?usp=sharing


# Telehealth Platform Architecture

---

## Architectural Overview

- **Clients (Web/Mobile):** Users access the platform through React and React Native apps. These clients handle both UI interactions and real-time media connections.
- ** Content Delivery Network:** Responsible for cachinG static assets.
- **Edge /WAF + Load Balancer:** Responsible for routing requests efficiently, terminating TLS connections, providing WAF protection, mitigating DDoS attacks, This layer ensures that both REST and WebSocket traffic are distributed properly.  
- **API Gateway & Microservices:** The heart of the platform. Microservices handle discrete responsibilities such as authentication, user/profile management, patient records, appointments, notifications, and billing. The API Gateway provides a unified entry point while enforcing authentication, rate limiting, and request validation.  
- **Data Layer:** Structured data is stored in relational databases(one for each service), large files and recordings in object storage, and Redis is used for caching sessions, presence, and frequently accessed data. This separation ensures both performance and data reliability.  
- **Media Layer:** SFU nodes handle low-latency audio/video streams, while TURN servers relay media when direct peer-to-peer connections are not possible. Clients connect directly to SFU/TURN for optimal performance.  
- **Messaging/Event Bus:** Facilitates asynchronous communication between microservices for notifications, billing, and analytics, helping decouple services and maintain responsiveness under high load.  
- **Security & Operations:** Centralized IAM, KMS, logging, monitoring, and SIEM ensure that security, observability, and auditing are consistently enforced across all components.

---

## 2. Key Technologies

- **Web & Mobile Clients:** React / React Native  
- **Microservices:** Node.js / Go / Java, containerized for easy scaling and deployment  
- **Database / Storage:** PostgreSQL/MySQL, S3/GCP/Azure object storage, Redis cache  
- **Media:** SFU cluster, TURN servers, WebRTC for real-time communications  
- **Messaging/Event Bus:** Kafka / NATS / RabbitMQ for async event-driven workflows  
- **Edge / Load Balancer / CDN:** TLS termination, WAF, DDoS protection, caching for optimized traffic flow  
- **Security / Monitoring:** IAM, KMS, SIEM, centralized logging, and metrics for observability

---

## 3. Scalability & Security Considerations

- **Horizontal scaling:** Stateless microservices and distributed SFU/TURN nodes allow the system to handle a large number of concurrent users.  
- **Caching & read replicas:** Reduce latency and database load for frequently accessed patient data and profiles.  
- **Event-driven architecture:** Decouples services, ensuring that notifications, analytics, and background processing do not block core workflows.  
- **TLS / DTLS encryption:** All API and WebRTC traffic is encrypted to protect data in transit.  
- **RBAC/ABAC, MFA, short-lived tokens:** Strong authentication and fine-grained authorization ensure that only authorized users can access sensitive data.  
- **Logging, monitoring, and SIEM:** Provides operational visibility, anomaly detection, and audit trails for compliance and incident response.

---

## 4. Microservices Approach

- Each service is **independent and stateless**, focused on a single responsibility.  
- Services **own their data**, which can reside in relational DBs, object storage, or caches.  
- Communication is via **REST APIs, WebSockets, or asynchronous events** through the messaging bus.  
- This architecture improves **scalability, maintainability, fault isolation**, and allows services to be deployed independently.

---

## 5. Design Trade-offs

- **SFU vs MCU:** SFU provides scalable, low-cost media handling, while MCU simplifies client logic at higher server resource cost.  
- **Multi-region vs single-region:** Multi-region deployment improves latency and resilience but adds operational complexity and cost.  
- **Serverless vs provisioned DB:** Serverless databases can handle sudden spikes efficiently; provisioned databases provide predictable performance for consistent workloads.  
- **End-to-End Encryption (E2EE):** Enhances privacy but disables server-side features such as recording or analytics.

---

## 6. Scenario Mapping

- **Video consultations:** Managed through WebRTC and SFU/TURN servers for real-time audio/video.  
- **Patient record management:** Records microservice interacts with databases and object storage.  
- **Secure authentication:** Handled by Auth microservice with RBAC/ABAC and MFA for user security.  
- **High concurrency:** Achieved through horizontal scaling of microservices, caching strategies, event-driven workflows, and a distributed media plane.



-----

## **1. Architectural Overview**

  - **\<span style="color:\#007bff"\>Clients (Web/Mobile):\</span\>** Users access the platform through React and React Native apps. These clients handle both UI interactions and real-time media connections.
  - **\<span style="color:\#ffc107"\>Content Delivery Network:\</span\>** Responsible for caching static assets.
  - **\<span style="color:\#fd7e14"\>Edge /WAF + Load Balancer:\</span\>** Responsible for routing requests efficiently, terminating TLS connections, providing WAF protection, mitigating DDoS attacks. This layer ensures that both REST and WebSocket traffic are distributed properly.
  - **\<span style="color:\#6f42c1"\>API Gateway & Microservices:\</span\>** The heart of the platform. Microservices handle discrete responsibilities such as authentication, user/profile management, patient records, appointments, notifications, and billing. The API Gateway provides a unified entry point while enforcing authentication, rate limiting, and request validation.
  - **\<span style="color:\#20c997"\>Data Layer:\</span\>** Structured data is stored in relational databases (one for each service), large files and recordings in object storage, and Redis is used for caching sessions, presence, and frequently accessed data. This separation ensures both performance and data reliability.
  - **\<span style="color:\#d63384"\>Media Layer:\</span\>** SFU nodes handle low-latency audio/video streams, while TURN servers relay media when direct peer-to-peer connections are not possible. Clients connect directly to SFU/TURN for optimal performance.
  - **\<span style="color:\#17a2b8"\>Messaging/Event Bus:\</span\>** Facilitates asynchronous communication between microservices for notifications, billing, and analytics, helping decouple services and maintain responsiveness under high load.
  - **\<span style="color:\#6c757d"\>Security & Operations:\</span\>** Centralized IAM, KMS, logging, monitoring, and SIEM ensure that security, observability, and auditing are consistently enforced across all components.

-----

## **2. Key Technologies**

  - **\<span style="color:\#007bff"\>Web & Mobile Clients:\</span\>** React / React Native
  - **\<span style="color:\#6f42c1"\>Microservices:\</span\>** Node.js / Go / Java, containerized for easy scaling and deployment
  - **\<span style="color:\#20c997"\>Database / Storage:\</span\>** PostgreSQL/MySQL, S3/GCP/Azure object storage, Redis cache
  - **\<span style="color:\#d63384"\>Media:\</span\>** SFU cluster, TURN servers, WebRTC for real-time communications
  - **\<span style="color:\#17a2b8"\>Messaging/Event Bus:\</span\>** Kafka / NATS / RabbitMQ for async event-driven workflows
  - **\<span style="color:\#fd7e14"\>Edge / Load Balancer / CDN:\</span\>** TLS termination, WAF, DDoS protection, caching for optimized traffic flow
  - **\<span style="color:\#6c757d"\>Security / Monitoring:\</span\>** IAM, KMS, SIEM, centralized logging, and metrics for observability

-----

## **3. Scalability & Security Considerations**

  - **\<span style="color:\#007bff"\>Horizontal scaling:\</span\>** Stateless microservices and distributed SFU/TURN nodes allow the system to handle a large number of concurrent users.
  - **\<span style="color:\#ffc107"\>Caching & read replicas:\</span\>** Reduce latency and database load for frequently accessed patient data and profiles.
  - **\<span style="color:\#17a2b8"\>Event-driven architecture:\</span\>** Decouples services, ensuring that notifications, analytics, and background processing do not block core workflows.
  - **\<span style="color:\#dc3545"\>TLS / DTLS encryption:\</span\>** All API and WebRTC traffic is encrypted to protect data in transit.
  - **\<span style="color:\#dc3545"\>RBAC/ABAC, MFA, short-lived tokens:\</span\>** Strong authentication and fine-grained authorization ensure that only authorized users can access sensitive data.
  - **\<span style="color:\#6c757d"\>Logging, monitoring, and SIEM:\</span\>** Provides operational visibility, anomaly detection, and audit trails for compliance and incident response.

-----

## **4. Microservices Approach**

  - Each service is **\<span style="color:\#007bff"\>independent and stateless\</span\>**, focused on a single responsibility.
  - Services **\<span style="color:\#6f42c1"\>own their data\</span\>**, which can reside in relational DBs, object storage, or caches.
  - Communication is via **\<span style="color:\#17a2b8"\>REST APIs, WebSockets, or asynchronous events\</span\>** through the messaging bus.
  - This architecture improves **\<span style="color:\#28a745"\>scalability, maintainability, fault isolation\</span\>**, and allows services to be deployed independently.

-----

## **5. Design Trade-offs**

  - **\<span style="color:\#d63384"\>SFU vs MCU:\</span\>** SFU provides scalable, low-cost media handling, while MCU simplifies client logic at higher server resource cost.
  - **\<span style="color:\#ffc107"\>Multi-region vs single-region:\</span\>** Multi-region deployment improves latency and resilience but adds operational complexity and cost.
  - **\<span style="color:\#20c997"\>Serverless vs provisioned DB:\</span\>** Serverless databases can handle sudden spikes efficiently; provisioned databases provide predictable performance for consistent workloads.
  - **\<span style="color:\#dc3545"\>End-to-End Encryption (E2EE):\</span\>** Enhances privacy but disables server-side features such as recording or analytics.

-----

## **6. Scenario Mapping**

  - **\<span style="color:\#d63384"\>Video consultations:\</span\>** Managed through WebRTC and SFU/TURN servers for real-time audio/video.
  - **\<span style="color:\#6f42c1"\>Patient record management:\</span\>** Records microservice interacts with databases and object storage.
  - **\<span style="color:\#6c757d"\>Secure authentication:\</span\>** Handled by Auth microservice with RBAC/ABAC and MFA for user security.
  - **\<span style="color:\#28a745"\>High concurrency:\</span\>** Achieved through horizontal scaling of microservices, caching strategies, event-driven workflows, and a distributed media plane.

---

# III. Technical Leadership Question (5 minutes)

**Prompt:**  

Describe a challenging technical decision you've made that balanced:

- **Technical complexity**  
- **Team capabilities**  
- **Business requirements**  
- **Long-term maintainability**




## Answer

In a recent project, I worked on an insurance agent app that calculated client premiums based on coverage, risk profile, and payment history. 

The challenge was building a system that could compute these premiums in real time for thousands of clients and adapt as business rules changed. I had to choose between putting all the logic in the database or creating a separate computation service. 

I decided on a **stateless FastAPI service** with caching and a relational database. This matched our team’s strengths, because some members were more comfortable in Python than in complex database procedures. With a dedicated service, the team could write and test calculations confidently without needing deep database expertise. 

This also ensured long-term maintainability because we could update rules without affecting other parts of the system.


I


