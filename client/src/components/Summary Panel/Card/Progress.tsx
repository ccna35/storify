import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { blue, green } from "@mui/material/colors";
import Fab from "@mui/material/Fab";
import SaveIcon from "@mui/icons-material/Save";
import { TotalIcon } from "./Icons";

type ProgressProps = {
  icon: JSX.Element;
  color: string;
  progress: number;
};

export default function Progress({ icon, color, progress }: ProgressProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flex: 1,
        position: "relative",
      }}
    >
      <Box>
        <Box
          sx={{
            width: 30,
            height: 30,
            position: "absolute",
            transform: "translate(-50%, -50%)",
            left: "50%",
            top: "50%",
          }}
        >
          {icon}
        </Box>
        <CircularProgress
          size={60}
          sx={{
            color: { color },
            position: "absolute",
            zIndex: 1,

            "&.MuiCircularProgress-determinate": {
              left: "50%",
              top: "50%",
            },

            "& .MuiCircularProgress-svg": {
              strokeLinecap: "round",
            },
          }}
          variant="determinate"
          value={progress}
          thickness={2}
          style={{ transform: "translate(-50%, -50%) rotate(-90deg)" }}
        />
      </Box>
    </Box>
  );
}
