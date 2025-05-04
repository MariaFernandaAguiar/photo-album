import { useParams } from 'react-router-dom'

export default function PhotoDetail() {
  const { id } = useParams()
  return <h1>Detalhes da Foto {id}</h1>
}
