export const getFilteredThemes = (themes, searchTerm) => {
  return themes.filter(({ title }) => {
    return title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
  });
};
