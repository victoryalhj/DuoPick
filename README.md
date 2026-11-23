# DuoPick

## Project Structure
```text
server/
├── server.js
├── models/
│   └── Group.js              
├── controllers/
│   ├── groupController.js      
│   ├── walletController.js     
│   ├── planController.js       
│   └── archiveController.js    
└── routes/
    ├── groupRoutes.js       # /api/groups routes
    ├── walletRoutes.js      #/api/groups/:code/wallet
    ├── planRoutes.js        # /api/groups/:code/plan routes
    └── archiveRoutes.js     # /api/groups/:code/archive


client/src/
├── services/
│   └── api.js                 
├── components/
│   ├── GroupSetup.jsx          
│   ├── WalletTab.jsx          
│   ├── PlanTab.jsx            
│   └── ArchiveTab.jsx         
├── App.jsx                    
└── main.jsx                   