const steps = [
    {
      title: "Choose a service",
      body: "Pick baby care, elderly care, or sick-person care that fits your family.",
    },
    {
      title: "Set your location and days",
      body: "Select your division, district, city, and area, then choose how many days you need.",
    },
    {
      title: "Confirm and get your invoice",
      body: "Review your total, confirm the booking, and receive an invoice by email.",
    },
  ];
  
  export function HowItWorksSection() {
    return (
      <section id="how-it-works" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">How it works</h2>
          <p className="mt-3 text-gray-600">Book care in three simple steps.</p>
        </div>
  
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="relative rounded-2xl bg-white p-8 ring-1 ring-gray-200"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white shadow-sm">
                {index + 1}
              </span>
              <h3 className="mt-5 text-lg font-semibold text-gray-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>
    );
  }