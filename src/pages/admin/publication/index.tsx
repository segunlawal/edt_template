import Publications from "@src/components/manageDomain/publication";
import Wrapper from "@src/components/manageDomain";
import { getAuthData } from "@src/utils/auth";
import { getCentre, handleError, request } from "@src/utils";
import { CachedCentreInt } from "@src/utils/interface";
import { GetServerSideProps } from "next";

const PublicationPageEntry = () => {
  return (
    <Wrapper>
      <Publications />
    </Wrapper>
  );
};

export default PublicationPageEntry;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { user, token } = getAuthData(context);
    const centre = (await getCentre(context)) as CachedCentreInt;

    const { data: fullCentre } = await request.get({
      url: `/centre/${centre.id}`,
      token,
    });
    const { data } = await request.get({
      url: `/centre/${centre.id}/publications`,
      token,
    });

    return {
      props: {
        pageData: { centre: fullCentre, publications: data.publications },
        cachedData: { user, centre, token },
      },
    };
  } catch (error) {
    return { props: { error: handleError(error) } };
  }
};
