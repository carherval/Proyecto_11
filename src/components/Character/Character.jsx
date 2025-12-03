import './Character.css'

import { useState } from 'react'

const NO_INFO_STR = 'Sin información'

const INFO_SECTIONS = {
  data: 'Datos básicos',
  descr: 'Descripción',
  bio: 'Biografía',
  transformations: 'Transformaciones'
}

const COLLAPSIBLE_OPTIONS = {
  open: 'Abrir',
  close: 'Cerrar'
}

const getCharacterData = (character) => (
  <>
    <div className='flex field'>
      <div className='flex label'>Nombre:</div>
      <div className='flex value'>{character.name}</div>
    </div>
    <div className='flex field'>
      <div className='flex label'>Género:</div>
      <div className='flex value'>{getKeyValue(character.genre)}</div>
    </div>
    <div className='flex field'>
      <div className='flex label'>Raza:</div>
      <div className='flex value'>{getKeyValue(character.race)}</div>
    </div>
    <div className='flex field'>
      <div className='flex label'>Planeta:</div>
      <div className='flex value'>{getKeyValue(character.planet)}</div>
    </div>
  </>
)

const getCharacterDescr = (character) => (
  <p>{getKeyValue(character.description)}</p>
)

const getCharacterBio = (character) => <p>{getKeyValue(character.biography)}</p>

const getCharacterTransformations = (character) =>
  character.transformations[0].image == null ||
  character.transformations[0].image === '' ? (
    <p>{NO_INFO_STR}</p>
  ) : (
    <ul className='flex transformations'>
      {character.transformations.map((transformation) => (
        <li key={transformation.id}>
          <img
            src={transformation.image}
            alt={getKeyValue(transformation.title)}
            title={getKeyValue(transformation.title)}
            onError={(event) => {
              event.currentTarget.src = '/assets/images/silueta.png'
              event.currentTarget.classList.add('no-image')
            }}
          />
        </li>
      ))}
    </ul>
  )

const getKeyValue = (keyValue) =>
  keyValue != null && keyValue.trim() !== '' ? keyValue : NO_INFO_STR

const Character = ({ character }) => {
  const [isInfoSectionOpened, setIsInfoSectionOpened] = useState([
    false,
    false,
    false,
    false
  ])

  const getCharacterInfoSection = (sectionIndex, sectionTitle, sectionInfo) => (
    <section className='info'>
      <h3
        className={isInfoSectionOpened[sectionIndex] ? 'opened' : undefined}
        title={`${
          !isInfoSectionOpened[sectionIndex]
            ? COLLAPSIBLE_OPTIONS.open
            : COLLAPSIBLE_OPTIONS.close
        } ${sectionTitle}`}
        onClick={() =>
          setIsInfoSectionOpened((isInfoSectionOpened) =>
            isInfoSectionOpened.map((isOpened, index) =>
              index === sectionIndex ? !isOpened : isOpened
            )
          )
        }
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

  return (
    <article className='flex personaje'>
      <h2>{character.name}</h2>
      <img src={character.image} alt={character.name} />
      {getCharacterInfoSection(
        0,
        INFO_SECTIONS.data,
        getCharacterData(character)
      )}
      {getCharacterInfoSection(
        1,
        INFO_SECTIONS.descr,
        getCharacterDescr(character)
      )}
      {getCharacterInfoSection(
        2,
        INFO_SECTIONS.bio,
        getCharacterBio(character)
      )}
      {getCharacterInfoSection(
        3,
        INFO_SECTIONS.transformations,
        getCharacterTransformations(character)
      )}
    </article>
  )
}

export default Character
