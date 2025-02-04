


export const ErrorPage = () => {
  return (
    <div className="h-full lg:px-6">
      <div className="flex justify-center gap-4 xl:gap-6 pt-3 px-4 lg:px-0  flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">
        {/* page 404 not found */}
        <div className="mt-6 gap-6 flex flex-col w-full">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold">404 Not Found</h3>
            <div className="grid md:grid-cols-2 grid-cols-1 2xl:grid-cols-3 gap-5  justify-center w-full">
              <div className="bg-default-50 shadow-lg rounded-2xl p-6">
                <h1 className="text-4xl font-semibold text-center">404</h1>
                <p className="text-center text-lg font-semibold">Page Not Found</p>
              </div>
            </div>
          </div>
        </div>
        
      </div>

    </div>
  )
}
