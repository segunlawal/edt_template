import React, { Fragment } from "react";
// next components
import Image from "next/image";
import NextLink from "next/link";
// mui components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Link as MuiLink } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AvatarGroup from "@mui/material/AvatarGroup";
// import { useTheme } from "@mui/material/styles";
//
import useGlobalStyle from "@src/styles";
import useCardStyle from "@src/styles/card";
// icons and resources
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
// interface and config
import config from "@src/utils/config";
import { AcademyFunc } from "./interfaceType";

const HeroSection: AcademyFunc = () => {
  const cardStyle = useCardStyle();
  const globalStyle = useGlobalStyle();

  return (
    <Fragment>
      <Box
        component="section"
        sx={{ pt: 4, px: { md: 6 }, pb: 8 }}
        className="hero-section"
      >
        <Container maxWidth="xl">
          <Grid
            container
            spacing={4}
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
              <Typography mb={2} variant="h5">
                WELCOME TO
              </Typography>
              <Typography
                mb={3}
                variant="h1"
                className={globalStyle.textGradient}
              >
                Ed Sherman school Academy
              </Typography>
              <Typography mb={3} paragraph maxWidth="450px">
                We are changing the way our students access vocational skills
                and in- demand skill contents.
              </Typography>
              <NextLink href={`${config.URL.WEB}login`} passHref>
                <Button
                  size="large"
                  disableElevation
                  variant="contained"
                  component={MuiLink}
                  className={globalStyle.bgGradient}
                >
                  Get Started
                </Button>
              </NextLink>
            </Grid>
            <Grid item xs={12} md={6} order={{ xs: 3, md: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
                className={cardStyle.breathCard}
              >
                <Paper
                  sx={{ maxWidth: 180, borderRadius: "20px !important" }}
                  className="left"
                >
                  <Typography variant="subtitle2">
                    Learn from best{" "}
                    <Typography
                      variant="subtitle2"
                      component="span"
                      color="primary.main"
                      fontWeight={"inherit"}
                    >
                      instructors
                    </Typography>{" "}
                    around the globe Explore Top
                  </Typography>
                  <Box maxWidth={140} mx="auto" mt={2}>
                    <AvatarGroup max={4} total={100}>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Avatar
                          key={`${index}-avatar`}
                          sx={{
                            bgcolor: "#FBEEE6",
                          }}
                        >
                          <PersonOutlineOutlinedIcon color="primary" />
                        </Avatar>
                      ))}
                    </AvatarGroup>
                  </Box>
                </Paper>
                <Paper
                  sx={{ maxWidth: 140, top: "75% !important" }}
                  className="right"
                >
                  <Avatar
                    sx={{
                      mx: "auto",
                      bgcolor: "#FBEEE6",
                    }}
                  >
                    <AutoStoriesOutlinedIcon color="primary" />
                  </Avatar>
                  <Typography variant="subtitle2">
                    Be certified upon course completion
                  </Typography>
                </Paper>
                <Box
                  className="breath-img-container"
                  sx={{
                    width: "70% !important",
                    borderRadius: "1.5rem !important",
                  }}
                >
                  <Image
                    layout="fill"
                    alt="yes we can"
                    objectFit="cover"
                    objectPosition="center"
                    src="/images/online-class1-img.jpg"
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Fragment>
  );
};
export default HeroSection;
