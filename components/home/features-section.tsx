const features = [
    {
      title: "Book in minutes",
      body: "Pick a service, choose the number of days, and set the location. Your total updates as you go.",
    },
    {
      title: "Transparent pricing",
      body: "Every rate is shown per day, and the total is calculated before you confirm.",
    },
    {
      title: "Secure accounts",
      body: "Your bookings belong to your account. Sign in anytime to track their status.",
    },
  ];
  
  export function FeaturesSection() {
    return (
      <section id="why-care" className="mx-auto max-w-6xl px-6 py-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Why Care.xyz</h2>
          <p className="mt-3 text-gray-600">
            Our mission is to make caregiving easy, secure, and accessible for
            every family.
          </p>
        </div>
  
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => (
            <div key={feature.title} className="rounded-2xl bg-white p-8 ring-1 ring-gray-200">
              <p className="text-sm font-semibold text-blue-600">0{index + 1}</p>
              <h3 className="mt-3 text-lg font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{feature.body}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }