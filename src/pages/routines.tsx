import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { GET_ROUTINE } from '../fragments';
import { snakeToUpperFirst, buildFrequencyString, buildMovementString } from '../utils/string';
import { getDayAndPrettyDate } from '../utils/date';
import Layout from '../components/layout';

const ROUTINES = gql`
${GET_ROUTINE}
query Routines {
  routines {
    ...getRoutine
  }
}
`;

const Exercise = ({sets, reps, movement, modifiers, effort, rx }) => {

  const frequency = buildFrequencyString(sets, reps);
  const movementString = buildMovementString(movement, modifiers, effort);

  return <span className="exercise">{frequency} {movementString}</span>;
};

const ExerciseWithAlternatives = ({primary, alternatives}) => alternatives ? (
  <details className="exercise-with-alts">
    <summary><Exercise {...primary} /></summary>
    {alternatives.map((alternative, index) => (
      <div key={`alternative-${index}`} style={{ marginLeft: '1rem' }}>
        <em>Alternative {index + 1}: <Exercise {...alternative} /></em>
      </div>
    ))}
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
  return <Layout title="All Routines">
    {data.routines.map((routine, routineIndex) => {
      const [day, date] = getDayAndPrettyDate(routine.date);
      const coach = snakeToUpperFirst(routine.coach);
      const category = snakeToUpperFirst(routine.category);

      return (
        <article className="routine" key={`routine-${routine.date}-${routineIndex}`}>
          <header className="routine__header">
            <strong className="routine__date">{day.toUpperCase()} / {date}</strong>
            <h2>{category} with {coach}</h2>
            {routine.summary && <p>{routine.summary}</p>}
          </header>
          {routine.sections.map((section, sectionIndex) => (
            <section className="routine__section" key={`${routineIndex}-section-${sectionIndex}`}>
              <h3>{section.name}: <span>{section.timing.duration} minutes</span></h3>
              {section.timing && <h4>{section.timing.repeats && `${section.timing.repeats} sets`} {section.timing.method}</h4>}
              <div>
                {section.components.map((component, componentIndex) => (
                  <ExerciseWithAlternatives
                    key={`${routineIndex}-${sectionIndex}-component-${componentIndex}`}
                    primary={component.primary}
                    alternatives={component.alternatives}
                  />
                ))}
              </div>
              
            </section>
          ))}

        </article>
      );
    })}
  </Layout>;
};

export default Routines;