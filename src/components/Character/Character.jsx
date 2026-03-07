import './Character.css'

import { useState } from 'react'
import helpers from '../../utils/helpers'
import options from '../../utils/options'

// Componente que muestra la información de un personaje
const Character = ({ character }) => {
  // Estado para gestionar los desplegables de las secciones de información del personaje
  const [isInfoSectionOpened, setIsInfoSectionOpened] = useState([
    false,
    false,
    false,
    false
  ])

  // Devuelve una sección de información del personaje en forma de desplegable
  const getCharacterInfoSection = (sectionIndex, sectionTitle, sectionInfo) => (
    <section className='info'>
      <h3
        tabIndex={0}
        className={isInfoSectionOpened[sectionIndex] ? 'opened' : undefined}
        title={`${
          !isInfoSectionOpened[sectionIndex]
            ? options.COLLAPSIBLE_OPTIONS.open
            : options.COLLAPSIBLE_OPTIONS.close
        } ${sectionTitle}`}
        onClick={() => setStateIsInfoSectionOpened(sectionIndex)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            setStateIsInfoSectionOpened(sectionIndex)
          }
        }}
      >
        {sectionTitle}
      </h3>
      <div
        className={!isInfoSectionOpened[sectionIndex] ? 'oculto' : undefined}
      >
        {sectionInfo}
      </div>
    </section>
  )

  // Sólo se cambia el estado del desplegable que se abre o se cierra
  const setStateIsInfoSectionOpened = (sectionIndex) =>
    setIsInfoSectionOpened((isInfoSectionOpened) =>
      isInfoSectionOpened.map((isOpened, index) =>
        index === sectionIndex ? !isOpened : isOpened
      )
    )

  return (
    <article className='flex personaje'>
      <h2>{helpers.getNotEmptyStr(character.name, true)}</h2>
      <img
        className={
          character.image.includes('silueta.png') ? 'no-image' : undefined
        }
        src={character.image}
        alt={helpers.getNotEmptyStr(character.name, true)}
      />
      {getCharacterInfoSection(
        0,
        options.CHARACTER_INFO_SECTIONS.data.title,
        helpers.getCharacterData(character)
      )}
      {getCharacterInfoSection(
        1,
        options.CHARACTER_INFO_SECTIONS.descr.title,
        helpers.getCharacterDescr(character)
      )}
      {getCharacterInfoSection(
        2,
        options.CHARACTER_INFO_SECTIONS.bio.title,
        helpers.getCharacterBio(character)
      )}
      {getCharacterInfoSection(
        3,
        options.CHARACTER_INFO_SECTIONS.transformations.title,
        helpers.getCharacterTransformations(character)
      )}
    </article>
  )
}

export default Character
