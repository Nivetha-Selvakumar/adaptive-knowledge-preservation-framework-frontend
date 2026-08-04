import React from "react";

import {
    Card,
    CardContent,
    Typography,
    Chip,
    Button,
    Stack,
    Divider,
} from "@mui/material";

import GitHubIcon from "@mui/icons-material/GitHub";
import SyncIcon from "@mui/icons-material/Sync";
import StorageIcon from "@mui/icons-material/Storage";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import type { Repository } from "./RepositoryList";


interface Props {
    repository: Repository;
}

export const RepositoryCard: React.FC<Props> = ({ repository }) => {

    const syncRepository = () => {

        console.log("Sync Repository :", repository.name);

        // TODO

        // POST /github/sync

    };

    const openKnowledge = () => {

        console.log("Open Knowledge");

    };

    const viewRepository = () => {

        window.open(
            `https://github.com/${repository.name}`,
            "_blank"
        );

    };

    return (

        <Card
            sx={{
                borderRadius: 4,
                border: "1px solid var(--border-color)",
                background: "var(--bg-input)"
            }}
        >

            <CardContent>

                {/* Header */}

                <Stack
                    direction="row"
                    sx={{
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >

                    <Stack direction={"row" as const} spacing={2} sx={{ alignItems: "center" }}>

                        <GitHubIcon
                            sx={{
                                fontSize: 42
                            }}
                        />

                        <div>

                            <Typography
                                variant="h6"
                                sx={{ fontWeight: 700 }}
                            >
                                {repository.name}
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                {repository.description}
                            </Typography>

                        </div>

                    </Stack>

                    <Chip
                        label={repository.visibility}
                        color="primary"
                        variant="outlined"
                    />

                </Stack>

                <Divider sx={{ my: 2 }} />

                {/* Information */}

                <Stack
                    direction="row"
                    spacing={4}
                    sx={{ flexWrap: "wrap" }}
                >

                    <div>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            Language
                        </Typography>

                        <Typography>

                            {repository.language}

                        </Typography>

                    </div>

                    <div>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            Last Updated
                        </Typography>

                        <Typography>

                            {repository.updatedAt}

                        </Typography>

                    </div>

                    <div>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            Knowledge
                        </Typography>

                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{ alignItems: "center" }}
                        >

                            {

                                repository.knowledgeStatus === "SYNCED"

                                    ?

                                    <CheckCircleIcon
                                        color="success"
                                        fontSize="small"
                                    />

                                    :

                                    <RadioButtonUncheckedIcon
                                        color="warning"
                                        fontSize="small"
                                    />

                            }

                            <Typography>

                                {repository.knowledgeStatus}

                            </Typography>

                        </Stack>

                    </div>

                    <div>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            Repository Agent
                        </Typography>

                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{ alignItems: "center" }}
                        >

                            <SmartToyIcon
                                color={
                                    repository.agentStatus === "ACTIVE"

                                        ?

                                        "success"

                                        :

                                        "disabled"
                                }
                            />

                            <Typography>

                                {repository.agentStatus}

                            </Typography>

                        </Stack>

                    </div>

                </Stack>

                <Divider sx={{ my: 2 }} />

                {/* Buttons */}

                <Stack
                    direction="row"
                    spacing={2}
                >

                    <Button
                        variant="contained"
                        startIcon={<SyncIcon />}
                        onClick={syncRepository}
                    >
                        Sync Knowledge
                    </Button>

                    <Button
                        variant="outlined"
                        startIcon={<StorageIcon />}
                        onClick={openKnowledge}
                    >
                        Open Knowledge
                    </Button>

                    <Button
                        variant="outlined"
                        startIcon={<VisibilityIcon />}
                        onClick={viewRepository}
                    >
                        View Repository
                    </Button>

                </Stack>

            </CardContent>

        </Card>

    );

};

