Data Flow:
- Tourist → Registration Module → Tourist Database (D1)
- Tourist → Location Tracking Module → Location Database (D2)
- Tourist → Emergency Alert Module → Alerts Database (D3)
- Authorities → Dashboard Module → Fetch data from D2 & D3
- Central Backend manages all validation, storage, and access control.
Tourist (Mobile Application)
 Admin / Police / Tourism Department (Web Dashboard)
 1. Tourist Registration & Identity Management
- Tourist submits registration details via mobile application.
- Backend validates input data.
- A unique tourist ID is generated.
- Identity data is securely stored in the Tourist Database (D1).
- Registration confirmation is sent back to the tourist.

2. Live Location Tracking
- Tourist device sends periodic location coordinates.
- Backend verifies the tourist ID.
- Location data is stored in the Location Database (D2).
- Latest location is made available to authorities via dashboard.

3. Emergency Alert Management
- Tourist triggers emergency alert using panic button.
- Alert request is validated by backend.
- Alert details are stored in Alerts Database (D3).
- Alert is immediately visible on the authority dashboard.
- Alert status updates can be tracked.

 4. Authority Dashboard Access
- Admin, Police, and Tourism Department users authenticate.
- Users access a unified web dashboard.
- Dashboard retrieves live locations and alerts from databases.
- Authorities can monitor, respond, and review incidents.

 5. Central Backend Processing
- Handles request validation and routing.
- Ensures role-based data access.
