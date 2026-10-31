import { apiFetch } from "@/lib/api";
import { ServiceCard } from "@/components/services/service-card";
import type { Service } from "@/types/api";

export async function ServicesSection() {
  const services = await apiFetch<Service[]>("/api/services");

  return (
    <section id="services" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-10">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Our services</h2>
        <p className="mt-3 text-gray-600">Choose the care that fits your family.</p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    </section>
  );
}