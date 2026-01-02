import Image from "next/image";

type Props = {
  name: string;
  designation: string;
  image?: string;
};

export default function MemberCard({ name, designation, image }: Props) {
  return (
    <div className="flex items-center gap-3 px-2 py-3 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition">
      <Image
        src={image || "/fallback-avatar.png"}
        alt={name}
        width={64}
        height={64}
        className="rounded-full object-cover"
      />

      <div className="leading-snug">
        <p className="text-sm font-bold text-black">
          {name}
        </p>
        <p className="text-xs font-medium text-black">
          {designation}
        </p>
      </div>
    </div>
  );
}
