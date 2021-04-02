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