const routePathMap = {
  classes: "Classes",
};

export const generateBreadcrumbs = (
  url: string,
  lastBreadcrumbLabel?: string
) => {
  const segments = url.split("/").filter((segment) => segment !== "");
  const breadcrumbs = [];

  breadcrumbs.push({
    label: "Home",
    icon: "i-heroicons-home",
    to: "/",
  });

  let pathSoFar = "";
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    pathSoFar += `/${segment}`;
    breadcrumbs.push({
      label: routePathMap[segment as keyof typeof routePathMap],
      to: pathSoFar,
    });
  }

  const lastItem = breadcrumbs.pop();

  const lastBreadcrumb = {
    label: lastBreadcrumbLabel ?? lastItem?.label,
  };

  breadcrumbs.push(lastBreadcrumb);

  return breadcrumbs;
};
