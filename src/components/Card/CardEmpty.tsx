import { LinkUI } from "../LinkUI";

import { Card, CardBody } from "@nextui-org/card";

import { ROUTES } from "@/constants/routes";

export const CardEmpty = () => {
  return (
    <Card>
      <CardBody>
        <p className="text-gray-400 text-center">
          You don't have any links yet!{" "}
          <LinkUI href={ROUTES.CREATE} className="text-base">
            Create one
          </LinkUI>
        </p>
      </CardBody>
    </Card>
  );
};
