export const calculateAge = (birthDate: string): any => {
  if (!birthDate) return "";

  try {
    const birth = new Date(birthDate);
    const today = new Date();

    // Проверка на валидность даты
    if (isNaN(birth.getTime())) {
      console.error("Invalid birth date:", birthDate);
      return 0;
    }

    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    // Если текущий месяц меньше месяца рождения ИЛИ
    // месяцы равны, но текущий день меньше дня рождения,
    // то уменьшаем возраст на 1
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  } catch (error) {
    console.error("Error calculating age:", error);
    return 0;
  }
};