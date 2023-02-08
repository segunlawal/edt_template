import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import { Link as MuiLink } from "@mui/material";
import NextLink from "next/link";
import AddSection from "./addSection";
import { useQuery } from "react-query";
import { handleError, request } from "@src/utils";
import dynamic from "next/dynamic";
import Accordion from "@src/components/shared/accordion";
import { useState } from "react";
import SectionMenu from "./menu";
import { SectionInt } from "./interface";
import Delete from "@src/components/shared/delete";

const fetchQuestion = async ({ queryKey }: { queryKey: Array<any> }) => {
  const [, centreId, examId] = queryKey;
  const { data } = await request.get({
    url: `/centre/${centreId}/exam/${examId}/questions`,
  });
  return data.sections;
};
export default function CustomizedMenus({
  examId,
  centreId,
  toggleToast,
}: {
  examId: string;
  centreId: string;
  toggleToast: Function;
}) {
  const Empty = dynamic(() => import("@src/components/shared/state/Empty"));
  const Loading = dynamic(() => import("@src/components/shared/loading"));
  const [expanded, setExpanded] = useState(0);

  const { isLoading, data, error, refetch } = useQuery(
    ["questions", centreId, examId],
    fetchQuestion
  );
  if (isLoading) {
    return (
      <Typography
        component="div"
        sx={{
          height: 300,
          display: "flex",
          justifyContent: "center",
          alignItem: "center",
        }}
      >
        <Typography>
          <Loading />
        </Typography>
      </Typography>
    );
  } else if (data) {
    return (
      <Stack spacing={4}>
        <Typography
          variant="h5"
          component="div"
          sx={{ textAlign: "center", fontSize: { xs: 25, md: 32 } }}
        >
          Add Exam Questions
        </Typography>
        <Typography variant="body1" component="p">
          Assign questions from your question bank into your exam. If you don’t
          have a question bank or questions in your question bank, please go to
          the question bank tab in your centre and create a question bank or add
          questions to your question bank.
        </Typography>
        <Box>
          <AddSection
            centreId={centreId}
            examId={examId}
            toggleToast={toggleToast}
            refetch={refetch}
          />
        </Box>
        <Box>
          {data?.length ? (
            data?.map((section: SectionInt, index: number) => (
              <Accordion
                onClick={() => setExpanded(index)}
                key={`${index}-section`}
                title={
                  <Typography variant="h5" component="div">
                    {section.name}
                  </Typography>
                }
                expanded={expanded === index}
              >
                <>
                  <Typography>{section.description}</Typography>

                  <Typography
                    component="div"
                    sx={{ display: "flex", justifyContent: "end" }}
                  >
                    {section.name === "general" ? (
                      <NextLink
                        href={`/admin/question-bank/${examId}/addQuestions`}
                        passHref
                      >
                        <MuiLink
                          sx={{
                            textDecoration: "none",
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <AddCircleOutlineOutlined />
                          &nbsp; Add Questions
                        </MuiLink>
                      </NextLink>
                    ) : (
                      <SectionMenu
                        centreId={centreId}
                        examId={examId}
                        section={section}
                        toggleToast={toggleToast}
                        refetch={refetch}
                      />
                    )}
                  </Typography>
                  {section.questions.length ? (
                    <>
                      <Typography variant="h5" component="div">
                        Questions
                      </Typography>
                      <Stack>
                        {section.questions.map(
                          ({ question, id }, questionIndex) => (
                            <Box
                              key={`${questionIndex}-question`}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <Avatar sx={{ mr: 2 }}>
                                  {++questionIndex}
                                </Avatar>
                                <Typography
                                  dangerouslySetInnerHTML={{
                                    __html: question.question,
                                  }}
                                />
                              </Box>

                              <Delete
                                updateData={refetch}
                                toggleToast={toggleToast}
                                url={`/centre/${centreId}/exam/${examId}/exam-question/${id}`}
                              />
                            </Box>
                          )
                        )}
                      </Stack>
                    </>
                  ) : (
                    <Typography sx={{ textAlign: "center" }}>
                      No Question Found.
                    </Typography>
                  )}
                </>
              </Accordion>
            ))
          ) : (
            <Empty />
          )}
        </Box>
      </Stack>
    );
  } else return <div>{handleError(error).message};</div>;
}
