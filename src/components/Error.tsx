
type ErrorProps = {
    children: React.ReactNode
}

const Error = ({children} : ErrorProps) => {
  return (
    <div className=" mt-2 text-center uppercase text-red-900 font-bold border border-l-8 border-red-600 py-2 rounded-md bg-red-200">
        {children}
    </div>
  )
}

export default Error