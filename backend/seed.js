require('dotenv').config();
const { sequelize, Tourist, Alert, Location } = require('./src/models/index');

const seedData = async () => {
  try {
    // 1. Sync Database (Force true to ensure names match exactly)
    await sequelize.sync({ force: true });
    console.log("Database synced. Old data cleared.");

    // 2. Create Sample Tourists
    const tourists = await Tourist.bulkCreate([
      { 
        fullName: "John Doe", 
        passportNumber: "P1234567", 
        visitStart: new Date(), 
        visitEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        publicKey: "mock_pub_1",
        digitalSignature: "mock_sig_1"
      },
      { 
        fullName: "Jane Smith", 
        passportNumber: "P9876543", 
        visitStart: new Date(), 
        visitEnd: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        publicKey: "mock_pub_2",
        digitalSignature: "mock_sig_2"
      }
    ]);

    // 3. Create Sample Locations
    await Location.bulkCreate([
      { 
        tourist_id: tourists[0].id, 
        touristId: tourists[0].id, 
        latitude: 27.1751, 
        longitude: 78.0421 
      },
      { 
        tourist_id: tourists[1].id, 
        touristId: tourists[1].id, 
        latitude: 27.1795, 
        longitude: 78.0214 
      }
    ]);

    // 4. Create Sample Alerts (Using alert_type and message)
    await Alert.bulkCreate([
      { 
        tourist_id: tourists[0].id, 
        touristId: tourists[0].id,
        alert_type: "Emergency", // MUST BE alert_type
        message: "Medical assistance needed at Taj Mahal East Gate.", // MUST BE message
        timestamp: new Date()
      },
      { 
        tourist_id: tourists[1].id, 
        touristId: tourists[1].id,
        alert_type: "Theft",
        message: "Backpack reported stolen near Agra Fort entrance.",
        timestamp: new Date()
      }
    ]);

    console.log("Database seeded successfully! 🌱");
    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedData();