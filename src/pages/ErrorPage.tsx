import PageWithHeader from "../components/PageWithHeader"

function ErrorPage() {
  return (
    <PageWithHeader>
      <div className="container prose dark:prose-invert mx-auto p-4">
        <main className="mt-10">
          <h1>Page not found</h1>
          <p>Try one of the links in the header</p>
        </main>
      </div>
    </PageWithHeader>
  )
}

export default ErrorPage
