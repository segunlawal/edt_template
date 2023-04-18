import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import PeopleAltOutlined from "@mui/icons-material/PeopleAltOutlined";
// import Diversity2OutlinedIcon from "@mui/icons-material/Diversity2Outlined";
import SubscriptionsOutlined from "@mui/icons-material/SubscriptionsOutlined";
import WalletOutlinedIcon from "@mui/icons-material/WalletOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";

import Card from "./card";
import useStyles from "./styles";

import { useToast } from "@src/utils/hooks";

import { BasePageProps } from "@src/utils/interface";
import { queryClient } from "@src/utils";
import dynamic from "next/dynamic";

const Dashboard = (): JSX.Element => {
  const styles = useStyles();
  const { toastMessage, toggleToast } = useToast();
  const { pageData, cachedData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const { plugins } = pageData;
  const Toast = dynamic(() => import("@src/components/shared/toast"));
  const Plugins = dynamic(() => import("./plugins"));
  const Services = dynamic(() => import("./services"));

  return (
    <Box mt={3}>
      <Box sx={{ display: "flex", alignItems: "centre" }} paddingY={4}>
        <Typography variant="h4" component="p" className={styles.welcomeNote}>
          Welcome
        </Typography>
        <LightModeOutlinedIcon color="primary" fontSize="large" />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            icon={<SubscriptionsOutlined htmlColor="#0047ab" />}
            title="Subscribers"
            bgColor="#add8e6"
            link="/admin/subscribers"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            icon={<ManageAccountsOutlinedIcon htmlColor="#ff9f00" />}
            title="Managers"
            bgColor="#ffe5b4"
            link="/admin/managers"
          />
        </Grid>
        {cachedData?.user?.isAdmin && (
          <Grid item xs={12} sm={6} md={3}>
            <Card
              icon={<WalletOutlinedIcon htmlColor="#9400d3" />}
              title="Centre Wallet"
              bgColor="#cea2fd"
              link="/admin/wallet"
            />
          </Grid>
        )}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            icon={<PeopleAltOutlined htmlColor="#9400d3" />}
            title="Registered Users"
            bgColor="#cea2fd"
            link="/admin/registered-users"
          />
        </Grid>
        {/* <Grid item xs={6} md={3}>
          <Card
            icon={<Diversity2OutlinedIcon htmlColor="#fff017" />}
            title="Group"
            bgColor="#ffffe0"
          />
        </Grid> */}
      </Grid>
      <Box sx={{ marginTop: 10 }}>
        {plugins.length && (
          <Services plugins={plugins} title="My Centre Pluggins" />
        )}
      </Box>

      <Plugins
        title="Better your experience by installing more pluggins"
        plugins={plugins}
      />
      {toastMessage && (
        <Toast
          message={toastMessage}
          status={Boolean(toastMessage)}
          showToast={toggleToast}
        />
      )}
    </Box>
  );
};
export default Dashboard;
