type FeatureProps = {
  name: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export const Feature = ({ feature }: { feature: FeatureProps}) => {
  return (
    <div key={feature.name} className="relative pl-16">
      <dt className="text-base/7 font-semibold text-gray-900 dark:text-white">
        <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600 dark:bg-indigo-500">
          <feature.icon aria-hidden="true" className="size-6 text-white" />
        </div>
        {feature.name}
      </dt>
      <dd className="mt-2 text-base/7 text-gray-600 dark:text-gray-400">
        {feature.description}
      </dd>
    </div>
  );
}