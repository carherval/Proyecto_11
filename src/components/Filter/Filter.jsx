import './Filter.css'

import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import options from '../../utils/options'
import strings from '../../utils/strings'

// Componente que pinta el formulario del filtro
const Filter = ({ getFilteredSagaCharacters }) => {
  const filterTitle = `Filtrado de ${
    useLocation().pathname !== `/${options.DRAGON_BALL_SECTIONS.dragons.id}`
      ? 'personajes'
      : 'dragones'
  }`

  // Se reordenan los campos del filtro (nombre, transformaciones, género, raza y planeta) y se asocia a cada uno sus opciones de selección en el filtro
  const filterFields = [
    options.CHARACTER_DATA_FIELD_LABELS.name,
    options.CHARACTER_INFO_SECTIONS.transformations,
    ...Object.values(options.CHARACTER_DATA_FIELD_LABELS).filter(
      (filterField) =>
        filterField.id !== options.CHARACTER_DATA_FIELD_LABELS.name.id
    )
  ].map((filterField) => ({
    ...filterField,
    options: options.FILTER_FIELD_OPTIONS[filterField.id]
  }))

  // Estado para gestionar la opción seleccionada de los campos del filtro
  const [filterValues, setFilterValues] = useState({
    name: '',
    genre: options.GENRE_FILTER_OPTIONS.allGenres.id,
    race: options.RACE_FILTER_OPTIONS.allRaces.id,
    planet: options.PLANET_FILTER_OPTIONS.allPlanets.id,
    transformations: options.TRANSFORMATION_FILTER_OPTIONS.both.id
  })
  // Estado para gestionar el desplegable del filtro
  const [isFilterOpened, setIsFilterOpened] = useState(false)

  const getFilterForm = () => (
    <form className='flex' onSubmit={(event) => event.preventDefault()}>
      {filterFields.map((filterField) => (
        <fieldset key={filterField.id} className='flex'>
          <legend className='oculto'>{filterField.title}</legend>
          <div className='flex'>
            {filterField.id === options.CHARACTER_DATA_FIELD_LABELS.name.id ? (
              getTextField(filterField.id, filterField.title)
            ) : (
              <>
                <span>{filterField.title}:</span>
                {getRadioButtonGroup(filterField.id, filterField.options)}
              </>
            )}
          </div>
        </fieldset>
      ))}
    </form>
  )

  const getTextField = (id, label) => (
    <>
      <label className='negrita' htmlFor={id}>
        {label}:
      </label>
      <input
        id={id}
        className='txt-fld'
        type='text'
        name={id}
        autoComplete='on'
        onChange={(event) => setStateFilterValues(id, event.target.value)}
      />
    </>
  )

  const getRadioButtonGroup = (groupName, options) =>
    Object.values(options).map((option) => (
      <React.Fragment key={option.id}>
        <input
          id={option.id}
          className='rd-btn'
          type='radio'
          name={groupName}
          value={option.id}
          checked={option.id === filterValues[groupName]}
          onChange={(event) =>
            setStateFilterValues(groupName, event.target.value)
          }
        />
        <label
          tabIndex={0}
          className='flex'
          htmlFor={option.id}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              document.getElementById(option.id).click()
            }
          }}
        >
          {option.title}
        </label>
      </React.Fragment>
    ))

  // Sólo se cambia el estado de la opción seleccionada que cambia en el filtro
  const setStateFilterValues = (filterFieldId, filterFieldValue) =>
    setFilterValues((filterValues) => ({
      ...filterValues,
      [filterFieldId]: filterFieldValue
    }))

  // Filtrado de los personajes de la saga al cambiar la opción seleccionada de un campo del filtro
  useEffect(() => {
    getFilteredSagaCharacters(filterValues)
  }, [filterValues])

  return (
    <>
      <h3
        tabIndex={0}
        className={isFilterOpened ? 'opened' : undefined}
        title={`${
          !isFilterOpened
            ? options.COLLAPSIBLE_OPTIONS.open
            : options.COLLAPSIBLE_OPTIONS.close
        } ${filterTitle}`}
        onClick={() => setIsFilterOpened((isOpened) => !isOpened)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            setIsFilterOpened((isOpened) => !isOpened)
          }
        }}
      >
        {filterTitle}
      </h3>
      <div className={!isFilterOpened ? 'oculto' : undefined}>
        {useLocation().pathname !==
        `/${options.DRAGON_BALL_SECTIONS.dragons.id}` ? (
          getFilterForm()
        ) : (
          <p className='negrita'>{strings.NO_FILTER_STR}</p>
        )}
      </div>
    </>
  )
}

export default Filter
