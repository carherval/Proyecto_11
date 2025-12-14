import './Character.css'

import { useState } from 'react'
import {
  CHARACTER_DATA_FIELD_LABELS,
  CHARACTER_INFO_SECTIONS,
  COLLAPSIBLE_OPTIONS,
  getNotEmptyStr,
  NO_INFO_STR
} from '../Fetch'

// Devuelve los datos básicos del personaje: nombre, género, raza y planeta
const getCharacterData = (character) => (
  <>
    <div className='flex field'>
      <div className='flex label'>
        {CHARACTER_DATA_FIELD_LABELS.name.title}:
      </div>
      <div className='flex value'>{getNotEmptyStr(character.name, true)}</div>
    </div>
    <div className='flex field'>
      <div className='flex label'>
        {CHARACTER_DATA_FIELD_LABELS.genre.title}:
      </div>
      <div className='flex value'>{getNotEmptyStr(character.genre)}</div>
    </div>
    <div className='flex field'>
      <div className='flex label'>
        {CHARACTER_DATA_FIELD_LABELS.race.title}:
      </div>
      <div className='flex value'>{getNotEmptyStr(character.race)}</div>
    </div>
    <div className='flex field'>
      <div className='flex label'>
        {CHARACTER_DATA_FIELD_LABELS.planet.title}:
      </div>
      <div className='flex value'>{getNotEmptyStr(character.planet)}</div>
    </div>
  </>
)

const getCharacterDescr = (character) => (
  <p>{getNotEmptyStr(character.description)}</p>
)

const getCharacterBio = (character) => (
  <p>{getNotEmptyStr(character.biography)}</p>
)

const getCharacterTransformations = (character) =>
  character.transformations[0].image != null &&
  character.transformations[0].image !== '' ? (
    <ul className='flex transformations'>
      {character.transformations.map((transformation) => (
        <li key={transformation.id}>
          <img
            src={transformation.image}
            alt={getNotEmptyStr(transformation.title)}
            title={getNotEmptyStr(transformation.title)}
            // Si la carga de la imagen da error, se carga una imagen genérica
            onError={(event) => {
              event.currentTarget.classList.add('no-image')
              event.currentTarget.src = '/assets/images/silueta.png'
            }}
          />
        </li>
      ))}
    </ul>
  ) : (
    <p>{NO_INFO_STR}</p>
  )

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
            ? COLLAPSIBLE_OPTIONS.open
            : COLLAPSIBLE_OPTIONS.close
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
      <h2>{getNotEmptyStr(character.name, true)}</h2>
      <img
        className={
          character.image.includes('silueta.png') ? 'no-image' : undefined
        }
        src={character.image}
        alt={getNotEmptyStr(character.name, true)}
      />
      {getCharacterInfoSection(
        0,
        CHARACTER_INFO_SECTIONS.data.title,
        getCharacterData(character)
      )}
      {getCharacterInfoSection(
        1,
        CHARACTER_INFO_SECTIONS.descr.title,
        getCharacterDescr(character)
      )}
      {getCharacterInfoSection(
        2,
        CHARACTER_INFO_SECTIONS.bio.title,
        getCharacterBio(character)
      )}
      {getCharacterInfoSection(
        3,
        CHARACTER_INFO_SECTIONS.transformations.title,
        getCharacterTransformations(character)
      )}
    </article>
  )
}

export default Character
