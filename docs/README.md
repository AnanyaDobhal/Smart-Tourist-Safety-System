#Our theme: web/app
#PS:   This problem statement proposes the development of a Smart Tourist Safety Monitoring & Incident Response System.
      Tourist often face safety issues. There is no centralised system for real time location tracking and emergency alerting to the authorities. 
#Solution approach: 
    Our system allows tourist to register and share their live location. 
    In case of emergency, by pressing panic button alerts are sent to police and tourism depts.
    All the data is managed through a centralised backend , PKI + digitalised signatures is used for verification.
#Features of our prototype:
    Tourist registration 
    Unique ID generation (RSA for PKI)
    Location tracking 
    Emergency alert system 
    Rest APIs using Node.js and  Express 
    Database storage (PostgreSQL) 
#System Architecture: 
    A mobile application facilitates interaction between tourists.
    Users of the Tourism, Police, and Administration departments have access to a single web dashboard.
    A centralized Node.js backend facilitates communication between all clients.
    Data is stored in a PostgreSQL database and requests are handled by the backend.
    Emergency alerts are prioritized and made visible to authorities.
#Prototype status:
    This is a minimal working prototype.
    A single web based dashboard for admin, police and tourism dept users.
    Core backend APIs are implemented.
    Frontend is basic/ under development.
    This application runs locally.
#Planned improvements for Round 2 :
    Cloud deployment 
    Real time notification 
    Mobile app integration for tourists to enable live location sharing 
    Improve system scalability, logging and monitoring for real world usage
