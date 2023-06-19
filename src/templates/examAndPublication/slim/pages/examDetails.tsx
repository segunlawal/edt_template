import { DEFAULT_LOGO, queryClient } from "@src/utils";
import ExamDetailsPage from "@src/components/ExamDetails";
import { BasePageProps, ExamInt } from "@src/utils/interface";
import ExamAndPublicationsWrapper from "@src/components/Layout/Wrapper/ExamAndPublicationWrapper";

const DetailsPage = () => {
  const { cachedData, pageData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const { name, logo } = cachedData.centre;
  const exam = pageData.exam as ExamInt;

  return (
    <ExamAndPublicationsWrapper
      title={name || ""}
      description={exam?.description || "Online Exam"}
      image={logo || DEFAULT_LOGO}
      showHeader={true}
      showFooter={true}
    >
      <ExamDetailsPage exam={exam} auth={pageData.auth} />
    </ExamAndPublicationsWrapper>
  );
};

export default DetailsPage;
