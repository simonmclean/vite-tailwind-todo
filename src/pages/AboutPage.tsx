import PageWithHeader from "../components/PageWithHeader"
import Typography from "../components/Typography"

const content = {
  technologies: [
    "Vite",
    "Typescript",
    "React",
    "React Router",
    "TailwindCSS",
    "localForage (TODO)"
  ],
  features: [
    "Add and remove items, with the latter leveraging the Web Animations API.",
    "Undo delete",
    "Toast notifications, which also leverage the Web Animations API",
    "Toggle done/not-done",
    "Editable items",
    "\"Created at\" and \"Updated at\" timestamps",
    "Offline support via localStorage",
    "Light and dark themes (including detection of system theme)",
  ]
}

function AboutPage() {
  return (
    <PageWithHeader>
      <div className="container prose mx-auto p-4">
        <main>
          <article>
            <Typography element="h2">About this project</Typography>
            <Typography element="p">I built this app as a way of shaking off the frontend cobwebs, refreshing my knowledge, and trying out some technologies that have become popular in the last few years.</Typography>
            <Typography element="p">The tech stack includes:</Typography>
            <ul>
              {content.technologies.map(str => (
                <li><Typography element="p" className="my-0">{str}</Typography></li>
              ))}
            </ul>
            <Typography element="p">Features include:</Typography>
            <ul>
              {content.features.map(str => (
                <li><Typography element="p" className="my-0">{str}</Typography></li>
              ))}
            </ul>
            <Typography element="p">Source code can be found at <a className="dark:text-slate-400" href="https://github.com/simonmclean/vite-tailwind-todo">github.com/simonmclean/vite-tailwind-todo</a></Typography>
          </article>
        </main>
      </div>
    </PageWithHeader>
  )
}

export default AboutPage
