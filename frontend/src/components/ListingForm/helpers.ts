export const handleCheckBoxNA = (
  option: string,
  getter: string[],
  setter: React.Dispatch<React.SetStateAction<string[]>>,
) => {
  if (option === "N/A") {
    setter(["N/A"]);
  } else if (getter.includes(option)) {
    const valueToRemove = "N/A";
    const index = getter.indexOf(valueToRemove);
    if (index !== -1) {
      getter.splice(index, 1);
    }

    setter(getter.filter((item: string) => item !== option));
  } else {
    const valueToRemove = "N/A";
    const index = getter.indexOf(valueToRemove);
    if (index !== -1) {
      getter.splice(index, 1);
    }
    setter([...getter, option]);
  }
};

export const formatDateForInput = (date?: string): string => {
  if (!date) return "";
  return new Date(date).toISOString().slice(0, 10);
};

export const formatDateForDisplay = (date?: string): string => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", { timeZone: "UTC" });
};
