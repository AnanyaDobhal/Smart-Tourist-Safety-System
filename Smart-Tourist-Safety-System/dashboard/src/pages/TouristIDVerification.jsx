import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Divider,
  Chip,
} from "@mui/material";
<QRScanner
  onScan={(data) => {
    setToken(data);
    setVerified(true); // later replace with API call
  }}
/>
import VerifiedIcon from "@mui/icons-material/Verified";

export default function TouristIDVerification() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);

  const handleVerify = () => {
    // TEMP: simulate verification
    if (token.length > 10) {
      setVerified(true);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        🪪 Tourist ID Verification
      </Typography>

      <Grid container spacing={2}>
        {/* LEFT PANEL */}
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6">Verify Tourist ID</Typography>

              <Button
                fullWidth
                variant="outlined"
                startIcon={<QrCodeScannerIcon />}
                sx={{ my: 2 }}
              >
                Scan QR Code
              </Button>

              <Divider>OR</Divider>

              <TextField
                fullWidth
                label="Enter Tourist ID Token"
                margin="normal"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />

              <Button
                fullWidth
                variant="contained"
                onClick={handleVerify}
              >
                Verify ID
              </Button>

              {verified && (
                <Chip
                  icon={<VerifiedIcon />}
                  label="ID VERIFIED"
                  color="success"
                  sx={{ mt: 2 }}
                />
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* RIGHT PANEL */}
        <Grid item xs={12} md={7}>
          <Card>
            <CardContent>
              <Typography variant="h6">Tourist Details</Typography>
              <Divider sx={{ my: 1 }} />

              {verified ? (
                <>
                  <Typography><b>Name:</b> John Doe</Typography>
                  <Typography><b>Nationality:</b> UK</Typography>
                  <Typography><b>Trip Duration:</b> 12–18 Sept</Typography>
                  <Typography>
                    <b>Safety Score:</b>{" "}
                    <Chip label="82 - LOW RISK" color="success" size="small" />
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Typography><b>Last Known Location:</b> Shillong</Typography>

                  <Grid container spacing={1} mt={1}>
                    <Grid item xs={4}>
                      <Button fullWidth variant="outlined">
                        View Location
                      </Button>
                    </Grid>
                    <Grid item xs={4}>
                      <Button fullWidth variant="outlined" color="warning">
                        Alerts
                      </Button>
                    </Grid>
                    <Grid item xs={4}>
                      <Button fullWidth variant="outlined" color="error">
                        Generate E-FIR
                      </Button>
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="body2">
                    🕒 Verified by Officer P102 at 12:41 PM
                  </Typography>
                </>
              ) : (
                <Typography color="text.secondary">
                  Verify a Tourist ID to view details
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
