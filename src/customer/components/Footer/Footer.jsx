import { Button } from "@headlessui/react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import React from "react";

const Footer = () => {
  return (
    <div style={{ backgroundColor: "black", color: "white", marginTop: "40px" }}>
      
      {/* ===== TOP FOOTER COLUMNS ===== */}
      <Grid
  container
  spacing={{ xs: 2, sm: 4, md: 8, lg: 14, xl: 30 }}
  paddingY={6}
  paddingX={{ xs: 3, sm: 6, md: 10 }}
  justifyContent="center"
  sx={{
    maxWidth: "1600px",
    mx: "auto",
  }}
>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>Company</Typography>
          <Button className="block mb-2">About</Button>
          <Button className="block mb-2">Blog</Button>
          <Button className="block mb-2">Press</Button>
          <Button className="block mb-2">Jobs</Button>
          <Button className="block mb-2">Partners</Button>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>Solutions</Typography>
          <Button className="block mb-2">Marketing</Button>
          <Button className="block mb-2">Analytics</Button>
          <Button className="block mb-2">Commerce</Button>
          <Button className="block mb-2">Insights</Button>
          <Button className="block mb-2">Supports</Button>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>Documentation</Typography>
          <Button className="block mb-2">Guides</Button>
          <Button className="block mb-2">API Status</Button>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>Legal</Typography>
          <Button className="block mb-2">Claim</Button>
          <Button className="block mb-2">Privacy</Button>
          <Button className="block mb-2">Terms</Button>
        </Grid>
      </Grid>

      {/* ===== DIVIDER ===== */}
      <div style={{ borderTop: "1px solid #333", maxWidth: "1200px", margin: "0 auto" }} />

      {/* ===== BOTTOM FOOTER TEXT (NEW ROW) ===== */}
      <Grid container justifyContent="center" paddingY={4}>
        <Grid item xs={12}>
          <Typography variant="body2" align="center">
            © 2023 My Company. All rights reserved.
          </Typography>
          <Typography variant="body2" align="center">
            Made with love by Me.
          </Typography>
          <Typography variant="body2" align="center">
            Icons made by{" "}
            <Link href="https://www.freepik.com" color="inherit" underline="always">
              Freepik
            </Link>{" "}
            from{" "}
            <Link href="https://www.flaticon.com/" color="inherit" underline="always">
              www.flaticon.com
            </Link>
          </Typography>
        </Grid>
      </Grid>

    </div>
  );
};

export default Footer;