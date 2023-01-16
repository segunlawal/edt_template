import React, { ChangeEvent } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import TextFields from "@src/components/shared/input/textField";
import useForm from "@src/hooks/useForm";
import TextArea from "@src/components/shared/textArea";
import { useToast } from "@src/utils/hooks";

import { useState } from "react";
import { handleError, queryClient, request, uploadFiles } from "@src/utils";
import ButtonComponent from "@src/components/shared/button";
import { BasePageProps, TemplateInt } from "@src/utils/interface";
import { ArrowBackIosNewOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const CreatePublication = () => {
  const { pageData, cachedData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;

  const { toastMessage, toggleToast } = useToast();
  const { getData, values, submit, resetValues } = useForm(Update);
  const { template } = pageData as {
    template: TemplateInt;
  };

  const [img, setImg] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoadingProgres, setImageLoadingProgress] = useState(0);
  const [convertedImage, setConvertedImage] = useState<any>();
  const [contents, setContents] = useState<Array<Record<any, any>>>(
    template.landingPageSectionTwo.contents
  );

  const [landingPageSectionOne, setLandingPageSectionOne] = useState<
    Record<any, any>
  >(template.landingPageSectionOne);

  const router = useRouter();
  const Toast = dynamic(() => import("@src/components/shared/toast"));
  const HeroImageUpload = dynamic(
    () => import("@src/components/shared/imageUpload")
  );
  const ImageUpload = dynamic(() => import("./imageUpload"));
  const Loading = dynamic(
    () => import("@src/components/shared/loading/loadingWithValue")
  );

  async function getImage() {
    let resolvedOption = [];
    for (let content of contents) {
      if (typeof content.imageUrl === "object") {
        content.imageUrl = await uploadFiles(
          content.imageUrl.base64,
          setImageLoadingProgress
        );
      }
      resolvedOption.push(content);
    }
    return resolvedOption;
  }

  async function Update() {
    try {
      setIsLoading(true);
      if (img.base64 && !convertedImage) {
        const imageUrl = await uploadFiles(img.base64, setImageLoadingProgress);
        landingPageSectionOne.imageUrl = imageUrl;
        setConvertedImage(imageUrl);
      }
      convertedImage && (landingPageSectionOne.imageUrl = convertedImage);
      const template = {
        landingPageSectionOne,
        landingPageSectionTwo: {
          contents: await getImage(),
        },
        ...values,
      };
      const data = await request.patch({
        url: `/centre/${cachedData.centre.id}/centre-template`,
        data: template,
      });
      toggleToast(data.message);
      resetValues();
      setIsLoading(false);
    } catch (error) {
      toggleToast(handleError(error).message);
      setIsLoading(false);
    }
  }

  return (
    <Box mt={6}>
      <Box>
        <Typography
          onClick={() => router.back()}
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <ArrowBackIosNewOutlined style={{ marginRight: 10 }} /> Back
        </Typography>
      </Box>

      <Typography
        variant="h4"
        component="div"
        style={{
          textTransform: "uppercase",
          marginTop: 40,
          textAlign: "center",
        }}
      >
        Manage website
      </Typography>
      <form onSubmit={(e) => submit(e)} style={{ marginTop: 40 }}>
        <Stack spacing={3} mt={3}>
          <Typography variant="h4" component="div">
            Landing Page Section 1
          </Typography>
          <TextFields
            type="text"
            label="Title"
            name="title"
            defaultValue={landingPageSectionOne.title}
            onChange={(e: ChangeEvent<any>) => {
              landingPageSectionOne.title = e.target.value;
              setLandingPageSectionOne({ ...landingPageSectionOne });
            }}
            inputProps={{ maxLength: 35 }}
            required
          />
          <HeroImageUpload
            setImg={setImg}
            img={img}
            uploadText="Select and upload image"
            defaultImage={landingPageSectionOne.imageUrl}
          />
          <Box>
            <Typography variant="subtitle1" component="div">
              Description *
            </Typography>
            <TextArea
              required
              placeholder="Type in description here ..."
              name="description"
              onChange={(e: ChangeEvent<any>) => {
                landingPageSectionOne.description = e.target.value;
                setLandingPageSectionOne({ ...landingPageSectionOne });
              }}
              defaultValue={landingPageSectionOne.description}
              style={{
                width: "100%",
                height: 120,
                borderRadius: 5,
                padding: 15,
              }}
              maxLength={200}
            />
          </Box>
          {contents.map((content, index) => (
            <Box key={`${index}-content`}>
              <Typography variant="h4" component="div">
                Landing Page Section {index + 2}
              </Typography>
              <TextFields
                type="text"
                label="Title"
                name="title"
                defaultValue={content.title}
                onChange={(e: ChangeEvent<any>) => {
                  contents[index].title = e.target.value;
                  setContents([...contents]);
                }}
                inputProps={{ maxLength: 35 }}
                sx={{
                  width: "100%",
                  mb: 2,
                }}
                required
              />
              <ImageUpload
                setImg={setContents}
                img={contents}
                uploadText="Select and upload image"
                index={index}
              />
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" component="div">
                  Description *
                </Typography>
                <TextArea
                  required
                  placeholder="Type in description here ..."
                  name="description"
                  onChange={(e: ChangeEvent<any>) => {
                    contents[index].description = e.target.value;
                    setContents([...contents]);
                  }}
                  defaultValue={content.description}
                  style={{
                    width: "100%",
                    height: 120,
                    borderRadius: 5,
                    padding: 15,
                  }}
                  maxLength={200}
                />
              </Box>
            </Box>
          ))}
          <TextFields
            type="color"
            label="Primary Color"
            name="primaryColor"
            defaultValue={template.primaryColor}
            onChange={getData}
            sx={{
              width: "100%",
              mb: 2,
            }}
            required
          />
          {/* <TextFields
            type="color"
            label="Secondary Color"
            name="secondaryColor"
            defaultValue={template.secondaryColor}
            onChange={getData}
            sx={{
              width: "100%",
              mb: 2,
            }}
            required
          /> */}
          <TextFields
            type="text"
            label="Google Analytics Code"
            name="googleAnalyticsCode"
            defaultValue={template.googleAnalyticsCode}
            onChange={getData}
            sx={{
              width: "100%",
              mb: 2,
            }}
          />
          <Typography style={{ textAlign: "right" }}>
            <ButtonComponent type="submit" sx={{ fontSize: 18 }}>
              Manage website
            </ButtonComponent>
          </Typography>
        </Stack>
      </form>

      {toastMessage && (
        <Toast
          message={toastMessage}
          status={Boolean(toggleToast)}
          showToast={toggleToast}
        />
      )}
      <Loading
        open={isLoading}
        color="primary"
        size={100}
        sx={{ marginLeft: 2 }}
        value={imageLoadingProgres}
      />
    </Box>
  );
};

export default CreatePublication;
