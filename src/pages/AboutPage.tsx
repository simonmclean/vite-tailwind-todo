import PageWithHeader from "../components/PageWithHeader"

const content = {
  technologies: [
    "Vite",
    "Typescript",
    "React",
    "React Router",
    "Tailwind CSS",
  ],
  features: [
    "Add, delete and edit items",
    "Undo delete",
    "Animations",
    "Toast notifications",
    "Toggle done/not-done",
    "PWA - Add to homescreen and offline mode",
    "Light and dark themes (including detection of system theme preference)",
  ]
}

function AboutPage() {
  return (
    <PageWithHeader>
      <div className="container prose dark:prose-invert mx-auto p-4">
        <main>
          <article className="mt-10">
            <h1>About this project</h1>
            <p>I built this app as a way of shaking off the frontend cobwebs, refreshing my knowledge, and trying out some technologies that have become popular in the last few years.</p>
            <p>The tech stack includes:</p>
            <ul>
              {content.technologies.map((str, index) => (
                <li key={index}><p className="my-0">{str}</p></li>
              ))}
            </ul>
            <p>Features include:</p>
            <ul>
              {content.features.map((str, index) => (
                <li key={index}><p className="my-0">{str}</p></li>
              ))}
            </ul>
            <p>Source code can be found at <a href="https://github.com/simonmclean/vite-tailwind-todo">github.com/simonmclean/vite-tailwind-todo</a>.</p>
            <p>You can find my personal site at <a href="http://simonmclean.dev">simonmclean.dev</a>.</p>
          </article>
        </main>
      </div>
    </PageWithHeader>
  )
}

export default AboutPage
