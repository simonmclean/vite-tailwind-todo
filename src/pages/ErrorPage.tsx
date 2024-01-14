import PageWithHeader from "../components/PageWithHeader"
import Typography from "../components/Typography"

function ErrorPage() {
  return (
    <PageWithHeader>
      <Typography element="h2">Oops</Typography>
      <Typography element="p">Something went wrong</Typography>
    </PageWithHeader>
  )
}

export default ErrorPage
