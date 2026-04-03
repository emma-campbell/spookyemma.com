---
title: CV
subtitle: Software engineer and maker of things. This is likely more up to date than linkedin or any thing else you might find out there.
sections:
  - heading: Experience
    order: 1
    entries:
      - role: Software Engineer
        organization: Arboretum Lifesciences
        location: Remote
        start: 2025-03
        end: present
        description: |
          - Designed and implemented a FHIR-to-OMOP clinical data transformation pipeline deployed as a Databricks Asset Bundle (DAB) across distributed customer environments, supporting airgapped infrastructure and data sovereignty requirements (Python, Databricks, Terraform, Azure)
          - Collaborated cross-functionally with engineering, data science, and clinical teams to define architecture and requirements for a company-wide clinical data platform, driving alignment across stakeholders through technical design documentation
          - Architected a multi-environment reference data promotion workflow for clinical reference files (~6M+ Athena/OMOP concepts, genetic variant definitions) across dev, staging, and production Databricks catalogs, with versioning, access control, and automated validation gating (Python, Databricks, Terraform, Azure)
          - Engineered patient-authorized FHIR data ingestion in Java Spring Boot (FHIR resources including Observations, Conditions, MedicationRequests, Encounters, and more) from patient-authorized sources (Epic, Cerner, NexGen)
          - Led post-acquisition maintenance and technical sunset of Hugo Health legacy applications, ensuring continuity for existing customers during platform migration
      - role: Software Engineer II
        organization: Hugo Health
        location: Remote
        start: 2023-03
        end: 2025-03
        description: |
          - Maintained robustness and scalability of containerized API services using Docker and Amazon ECS, ensuring
          uninterrupted service and efficient resource management.
          - Led maintenance and expansion of API integrations with prominent medical device systems like Dexcom, and
          Fitbit, leveraging REST APIs to enhance data accessibility and interoperability.
          - Acted as a primary liaison between technical teams and customers, actively engaging in requirement gathering,
          technical support, and issue resolution.
          - Led a collaborative effort across multiple teams to create comprehensive documentation, facilitating clear
          understanding of system architecture, workflows, and dependencies, resulting in improved communication,
          knowledge sharing, and alignment across the organization.
          - Maintained Hugo Connect, an embedded health widget, through the implementation of features and bug fixes
          utilizing Next.js, React.js, and TailwindCSS enhancing usability and functionality.
      - role: Software Engineer
        organization: Hugo Health
        location: Remote
        start: 2021-07
        end: 2023-03
        description: |
          - Upheld responsibility for maintaining and enhancing existing software systems, ensuring ongoing stability,
          performance, and scalability by writing efficient and well-tested code (Typescript/Node.Js).
          - Implemented additional HL7® FHIR integrations with vendors such as Epic, Cerner, and Humana
          (Typescript/Node.Js).
          - Enhanced stability of existing Electronic Health Record (EHR) integrations, increasing success rate from 72.8%
          to 83.4%, and expanded reach by integrating with over 300 new hospital and clinic locations (Typescript)
      - role: Software Engineering Intern
        organization: Ares Sportswear
        location: Hilliard, Ohio
        start: 2018-05
        end: 2020-11
        description: |
          - Assisted senior engineers in the design, development, and testing phases of software projects, contributing to
          the completion of a complex clothing artwork design application (Node.Js/Express.Js).
  - heading: Education
    order: 2
    entries:
      - role: B.A. Computer Science
        organization: University of Rochester
        location: Rochester, NY
        start: 2017-08
        end: 2021-05
        description: |
          - Focus in human-computer interaction
          - Coursework: Introduction to Computer Science, Statistical Computing using R, Data Structures and Algorithms, Computation and Formal Systems, Computer Organization, Introduction to Human-Computer Interaction, Mobile App Development, Introduction to Artificial Inteligence, Computer Models and Limitations, Social Implications of Computer, Advanced Web Development
          - Extracurriculars: Player/Coach; Varsity Soccer, Director of Communications; Grassroots Soccer, Member; Girls Who Code, Volunteer; Quillen Robotics Lab
  - heading: Skills
    order: 3
    entries:
      - role: Languages & Frameworks
        description: |
          TypeScript, ExpressJS, Python, FastAPI, Svelte, React, Databricks, Java Spring Boot, SQL
      - role: Infrastructure & Cloud
        description: |
          AWS, Azure, Docker, Terraform/OpenTofu, Databricks Asset Bundles (DAB), Github Actions, Digital Ocean
      - role: Healthcare Data & Systems
        description: |
          Smart on FHIR (OAuth 2.0), OMOP, HL7® FHIR, Epic, Cerner, NexGen, eClinicalWorks
---
