import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/types/api";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-52 w-full overflow-hidden bg-gray-100">
        <Image
          src={service.imageUrl}
          alt={service.title}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-600">
          {service.description}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <p className="text-lg font-bold text-gray-900">
            ৳{service.hourlyRate}
            <span className="text-sm font-normal text-gray-500"> /day</span>
          </p>
          <Link
            href={`/service/${service._id}`}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            View details →
          </Link>
        </div>
      </div>
    </article>
  );
}