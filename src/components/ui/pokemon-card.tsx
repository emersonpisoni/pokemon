import Image from "next/image"
import Link from "next/link"

type PokemonCardType = {
  name: string
  url: string
}

export function PokemonCard({ name, url }: PokemonCardType) {
  return <Link href={name}>
    <div key={name} className="bg-white/30 p-10 flex flex-col justify-center items-center shadow-2xl rounded-lg transition-transform cursor-pointer hover:scale-110">
      <Image
        alt={name}
        src={url}
        width={400}
        height={200}
        priority />
      <span className="text-white font-mono text-2xl">{name}</span>
    </div></Link>
}