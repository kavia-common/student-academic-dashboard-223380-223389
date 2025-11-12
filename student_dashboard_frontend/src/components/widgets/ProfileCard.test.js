import { render, screen } from '@testing-library/react';
import ProfileCard from './ProfileCard';

const profile = {
  name: 'Alex Johnson',
  program: 'B.Sc. Computer Science',
  year: 3,
  gpa: 3.72,
  email: 'alex.johnson@example.edu'
};

test('ProfileCard renders profile name and GPA', () => {
  render(<ProfileCard profile={profile} />);
  expect(screen.getByText(/Alex Johnson/)).toBeInTheDocument();
  expect(screen.getByText(/GPA 3.72/)).toBeInTheDocument();
});
