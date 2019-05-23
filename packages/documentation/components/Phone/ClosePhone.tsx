import React, { FunctionComponent, useCallback } from "react";
import cn from "classnames";
import { AppBarNav, AppBarNavProps } from "@react-md/app-bar";
import {
  KeyboardArrowLeftSVGIcon,
  CloseSVGIcon,
} from "@react-md/material-icons";

import { usePhoneContext } from "./context";
import { bem } from "@react-md/theme";

const block = bem("phone");

interface Props extends AppBarNavProps {
  floating?: boolean;
}

const ClosePhone: FunctionComponent<Props> = ({
  children,
  onClick,
  floating,
  className,
  ...props
}) => {
  const { id, closePhone } = usePhoneContext();
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (onClick) {
        onClick(event);
      }

      closePhone();
    },
    [onClick]
  );

  return (
    <AppBarNav
      {...props}
      id={`${id}-close`}
      onClick={handleClick}
      theme={floating ? "secondary" : undefined}
      themeType={floating ? "contained" : undefined}
      className={cn(block("close", { floating }), className)}
    >
      {floating ? <CloseSVGIcon /> : children}
    </AppBarNav>
  );
};

ClosePhone.defaultProps = {
  "aria-label": "Go back",
  children: <KeyboardArrowLeftSVGIcon />,
  floating: false,
};

export default ClosePhone;