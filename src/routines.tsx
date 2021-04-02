import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { GET_EXERCISE } from './fragments';

const ROUTINES = gql`
${GET_EXERCISE}
query Routines {
  routines {
    date
    category
    summary
    name
    coach
    sections {
      name
      timing {
        duration
        repeats
        method
      }
      components {
        isRx
        primary {
          ...getExercise
        }
        alternatives {
          ...getExercise
        }
      }
    }
  }
}
`;

const buildFrequencyString = (sets, reps) => {
  let frequency = '';

  if (sets?.min) {
    frequency += `${sets.min} x `;
  }

  frequency += reps.min;

  if (reps.max) {
    frequency += ` - ${reps.max}`;
  }

  return frequency;
};

const buildMovementString = (movement, modifiers, effort) => {
  let movementString = '';

  if (modifiers?.equipment) {
    if (modifiers.equipment.style) {
      movementString += `${modifiers.equipment.style.join(' ')} `;
    }

    movementString += `${modifiers.equipment.base} `;
  }

  if (modifiers?.place) {
    if (modifiers.place?.orientation) {
      movementString += `${modifiers.place.orientation} `;
    } 
    movementString += `${modifiers.place.base} `;
    
  }
  
  movementString += `${movement} `;

  if (modifiers?.tempo) {
    movementString += `(with tempo: ${modifiers.tempo}) `;
  }
  
  if (effort) {
    if (effort?.value) {
      movementString += `at ${effort.value*100}`;
    }
    movementString += `${effort.method}`;
  }

  return movementString;
};

// const buildEffortString = (effort)

const Exercise = ({sets, reps, movement, modifiers, effort, rx }) => {

  const frequency = buildFrequencyString(sets, reps);
  const movementString = buildMovementString(movement, modifiers, effort);

  return <span>{frequency} {movementString}</span>;
};

const ExerciseWithAlternatives = ({primary, alternatives}) => alternatives ? (
  <details>
    <summary><Exercise {...primary} /></summary>
    {alternatives.map((alternative, index) => <div key={`alternative-${index}`}><em>Alternative {index + 1}: <Exercise {...alternative}  /></em></div>)}
  </details>
) : (
  <div><Exercise {...primary} /></div>
);


const Routines = () => {
  const { data, loading, error } = useQuery(ROUTINES);

  if (error) {
    return <p>error</p>;
  }

  if (loading) {
    return <p>loading</p>;
  }
  return <div>
    {data.routines.map((routine, routineIndex) => (
      <div key={`routine-${routine.date}-${routineIndex}`}>
        <div>
          <h4>{routine.date}</h4>
          <h2>{routine.category} with {routine.coach}</h2>
          <p>{routine.summary}</p>
        </div>
        <div>
          {routine.sections.map((section, sectionIndex) => (
            <div key={`${routineIndex}-section-${sectionIndex}`}>
              <h3>{section.name}: <span>{section.timing.duration} minutes</span></h3>
              <strong>{section.timing.repeats && `${section.timing.repeats} sets`} {section.timing.method}</strong>
              <div>
                {section.components.map((component, componentIndex) => (
                  <ExerciseWithAlternatives
                    key={`${routineIndex}-${sectionIndex}-component-${componentIndex}`}
                    primary={component.primary}
                    alternatives={component.alternatives}
                  />
                ))}
              </div>
              
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>;
};

export default Routines;