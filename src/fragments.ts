import { gql } from '@apollo/client';

export const GET_EXERCISE = gql`
  fragment getExercise on Exercise {
    movement
    sets {
      min
      max
    }
    reps {
      min
      max
      method
    }
    effort {
      method
      value
    }
    rx {
      male
      female
    }
    modifiers {
      tempo
      equipment {
        base
        style
      }
      place {
        base
        orientation
      }
    }
  }
`;

export const GET_ROUTINE = gql`
  ${GET_EXERCISE}
  fragment getRoutine on Routine {
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
`;