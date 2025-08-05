"use client";

import React from "react";

type Feature = {
  title: string;
  description: string;
};

type FeaturesProps = {
  title?: string;
  subtitle?: string;
  features?: Feature[];
};

export default function FeaturesSection({
  title = "Our Features",
  subtitle = "Discover what makes us special",
  features = [
    {
      title: "Feature 1",
      description: "This is a feature description.",
    },
    {
      title: "Feature 2",
      description: "This is another feature description.",
    },
    {
      title: "Feature 3",
      description: "This is a third feature description.",
    },
  ],
}: FeaturesProps) {
  return (
    <section className="py-12 px-6 bg-gray-50 rounded-lg">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg hover:border-blue-500"
            >
              <h3 className="text-xl font-bold mb-3 text-blue-600">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
