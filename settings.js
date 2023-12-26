//switching tabs
function goto_tab(id) {
    switch (id) {
        case 0:
            game.tab = id

            document.getElementById("spices_page").style.display = "block"
            goto_subtab(game.subtab[0])
            document.getElementById("prestige_page").style.display = "none"
            document.getElementById("crystal_page").style.display = "none"
            document.getElementById("crystal_page2").style.display = "none"
            document.getElementById("prestige_tabs").style.display = "none"
            document.getElementById("ascension_page").style.display = "none"
            document.getElementById("ascension_page2").style.display = "none"
            document.getElementById("challenges_page").style.display = "none"
            document.getElementById("arcane_page").style.display = "none"
            document.getElementById("ascension_tabs").style.display = "none"
            document.getElementById("collapse_page").style.display = "none"
            document.getElementById("research_page").style.display = "none"
            document.getElementById("challenges_page2").style.display = "none"
            document.getElementById("antispice_page").style.display = "none"
            document.getElementById("collapse_tabs").style.display = "none"
            document.getElementById("statistics_page").style.display = "none"
            document.getElementById("statistics_buttons").style.display = "none"
            document.getElementById("prestige_statistics_page").style.display =
                "none"
            document.getElementById("ascension_statistics_page").style.display =
                "none"
            document.getElementById("collapse_statistics_page").style.display =
                "none"
            document.getElementById("statistics_tabs").style.display = "none"
            document.getElementById("compendium_page").style.display = "none"
            document.getElementById("settings_page").style.display = "none"

            document.getElementById("spices").className = "tab selected"
            if (
                game.color_boosts >= 10 ||
                game.prestige >= 1 ||
                game.ascend >= 1 ||
                game.collapse >= 1
            )
                document.getElementById("prestige").className = "tab unlocked"
            else document.getElementById("prestige").className = "tab locked"
            if (game.prestige_bought[25])
                document.getElementById("ascension").className = "tab unlocked"
            else document.getElementById("ascension").className = "tab locked"
            if (game.ascend_complete[5])
                document.getElementById("collapse").className = "tab unlocked"
            else document.getElementById("collapse").className = "tab locked"
            document.getElementById("statistics").className = "tab unlocked"
            if (game.compendium_new)
                document.getElementById("compendium").className = "tab notice"
            else
                document.getElementById("compendium").className = "tab unlocked"
            document.getElementById("settings").className = "tab unlocked"
            break
        case 1:
            if (
                game.color_boosts >= 10 ||
                game.prestige >= 1 ||
                game.ascend >= 1 ||
                game.collapse >= 1
            ) {
                game.tab = id

                goto_subtab(game.subtab[1])
                document.getElementById("spices_page").style.display = "none"
                document.getElementById("spices_tabs").style.display = "none"
                document.getElementById("ascension_page").style.display = "none"
                document.getElementById("ascension_page2").style.display =
                    "none"
                document.getElementById("challenges_page").style.display =
                    "none"
                document.getElementById("arcane_page").style.display = "none"
                document.getElementById("ascension_tabs").style.display = "none"
                document.getElementById("collapse_page").style.display = "none"
                document.getElementById("research_page").style.display = "none"
                document.getElementById("challenges_page2").style.display =
                    "none"
                document.getElementById("antispice_page").style.display = "none"
                document.getElementById("collapse_tabs").style.display = "none"
                document.getElementById("statistics_page").style.display =
                    "none"
                document.getElementById("statistics_buttons").style.display =
                    "none"
                document.getElementById(
                    "prestige_statistics_page"
                ).style.display = "none"
                document.getElementById(
                    "ascension_statistics_page"
                ).style.display = "none"
                document.getElementById(
                    "collapse_statistics_page"
                ).style.display = "none"
                document.getElementById("statistics_tabs").style.display =
                    "none"
                document.getElementById("compendium_page").style.display =
                    "none"
                document.getElementById("settings_page").style.display = "none"

                document.getElementById("prestige").className = "tab selected"
                document.getElementById("spices").className = "tab unlocked"
                if (game.prestige_bought[25])
                    document.getElementById("ascension").className =
                        "tab unlocked"
                else
                    document.getElementById("ascension").className =
                        "tab locked"
                if (game.ascend_complete[5])
                    document.getElementById("collapse").className =
                        "tab unlocked"
                else
                    document.getElementById("collapse").className = "tab locked"
                document.getElementById("statistics").className = "tab unlocked"
                if (game.compendium_new)
                    document.getElementById("compendium").className =
                        "tab notice"
                else
                    document.getElementById("compendium").className =
                        "tab unlocked"
                document.getElementById("settings").className = "tab unlocked"
            }
            break
        case 2:
            if (game.prestige_bought[25]) {
                game.tab = id

                goto_subtab(game.subtab[3])
                document.getElementById("ascension_tabs").style.display = "flex"
                document.getElementById("spices_page").style.display = "none"
                document.getElementById("spices_tabs").style.display = "none"
                document.getElementById("prestige_page").style.display = "none"
                document.getElementById("crystal_page").style.display = "none"
                document.getElementById("crystal_page2").style.display = "none"
                document.getElementById("prestige_tabs").style.display = "none"
                document.getElementById("collapse_page").style.display = "none"
                document.getElementById("research_page").style.display = "none"
                document.getElementById("challenges_page2").style.display =
                    "none"
                document.getElementById("antispice_page").style.display = "none"
                document.getElementById("collapse_tabs").style.display = "none"
                document.getElementById("statistics_page").style.display =
                    "none"
                document.getElementById("statistics_buttons").style.display =
                    "none"
                document.getElementById(
                    "prestige_statistics_page"
                ).style.display = "none"
                document.getElementById(
                    "ascension_statistics_page"
                ).style.display = "none"
                document.getElementById(
                    "collapse_statistics_page"
                ).style.display = "none"
                document.getElementById("statistics_tabs").style.display =
                    "none"
                document.getElementById("compendium_page").style.display =
                    "none"
                document.getElementById("settings_page").style.display = "none"

                document.getElementById("ascension").className = "tab selected"
                document.getElementById("spices").className = "tab unlocked"
                if (
                    game.color_boosts >= 10 ||
                    game.prestige >= 1 ||
                    game.ascend >= 1 ||
                    game.collapse >= 1
                )
                    document.getElementById("prestige").className =
                        "tab unlocked"
                else
                    document.getElementById("prestige").className = "tab locked"
                if (game.ascend_complete[5])
                    document.getElementById("collapse").className =
                        "tab unlocked"
                else
                    document.getElementById("collapse").className = "tab locked"
                document.getElementById("statistics").className = "tab unlocked"
                if (game.compendium_new)
                    document.getElementById("compendium").className =
                        "tab notice"
                else
                    document.getElementById("compendium").className =
                        "tab unlocked"
                document.getElementById("settings").className = "tab unlocked"
            }
            break
        case 3:
            if (game.ascend_complete[5] || game.collapse >= 1) {
                game.tab = id

                goto_subtab(game.subtab[4])
                document.getElementById("spices_page").style.display = "none"
                document.getElementById("spices_tabs").style.display = "none"
                document.getElementById("prestige_page").style.display = "none"
                document.getElementById("crystal_page").style.display = "none"
                document.getElementById("crystal_page2").style.display = "none"
                document.getElementById("prestige_tabs").style.display = "none"
                document.getElementById("ascension_page").style.display = "none"
                document.getElementById("ascension_page2").style.display =
                    "none"
                document.getElementById("challenges_page").style.display =
                    "none"
                document.getElementById("arcane_page").style.display = "none"
                document.getElementById("ascension_tabs").style.display = "none"
                document.getElementById("statistics_page").style.display =
                    "none"
                document.getElementById("statistics_buttons").style.display =
                    "none"
                document.getElementById(
                    "prestige_statistics_page"
                ).style.display = "none"
                document.getElementById(
                    "ascension_statistics_page"
                ).style.display = "none"
                document.getElementById(
                    "collapse_statistics_page"
                ).style.display = "none"
                document.getElementById("statistics_tabs").style.display =
                    "none"
                document.getElementById("compendium_page").style.display =
                    "none"
                document.getElementById("settings_page").style.display = "none"

                document.getElementById("collapse").className = "tab selected"
                document.getElementById("spices").className = "tab unlocked"
                if (
                    game.color_boosts >= 10 ||
                    game.prestige >= 1 ||
                    game.ascend >= 1 ||
                    game.collapse >= 1
                )
                    document.getElementById("prestige").className =
                        "tab unlocked"
                else
                    document.getElementById("prestige").className = "tab locked"
                if (game.prestige_bought[25])
                    document.getElementById("ascension").className =
                        "tab unlocked"
                else
                    document.getElementById("ascension").className =
                        "tab locked"
                document.getElementById("statistics").className = "tab unlocked"
                if (game.compendium_new)
                    document.getElementById("compendium").className =
                        "tab notice"
                else
                    document.getElementById("compendium").className =
                        "tab unlocked"
                document.getElementById("settings").className = "tab unlocked"
            }
            break
        case 5:
            game.tab = id

            goto_subtab(game.subtab[2])
            document.getElementById("spices_page").style.display = "none"
            document.getElementById("spices_tabs").style.display = "none"
            document.getElementById("prestige_page").style.display = "none"
            document.getElementById("crystal_page").style.display = "none"
            document.getElementById("crystal_page2").style.display = "none"
            document.getElementById("prestige_tabs").style.display = "none"
            document.getElementById("ascension_page").style.display = "none"
            document.getElementById("ascension_page2").style.display = "none"
            document.getElementById("challenges_page").style.display = "none"
            document.getElementById("arcane_page").style.display = "none"
            document.getElementById("ascension_tabs").style.display = "none"
            document.getElementById("collapse_page").style.display = "none"
            document.getElementById("research_page").style.display = "none"
            document.getElementById("challenges_page2").style.display = "none"
            document.getElementById("antispice_page").style.display = "none"
            document.getElementById("collapse_tabs").style.display = "none"
            document.getElementById("compendium_page").style.display = "none"
            document.getElementById("settings_page").style.display = "none"

            document.getElementById("statistics").className = "tab selected"
            document.getElementById("spices").className = "tab unlocked"
            if (
                game.color_boosts >= 10 ||
                game.prestige >= 1 ||
                game.ascend >= 1 ||
                game.collapse >= 1
            )
                document.getElementById("prestige").className = "tab unlocked"
            else document.getElementById("prestige").className = "tab locked"
            if (game.prestige_bought[25])
                document.getElementById("ascension").className = "tab unlocked"
            else document.getElementById("ascension").className = "tab locked"
            if (game.ascend_complete[5])
                document.getElementById("collapse").className = "tab unlocked"
            else document.getElementById("collapse").className = "tab locked"
            if (game.compendium_new)
                document.getElementById("compendium").className = "tab notice"
            else
                document.getElementById("compendium").className = "tab unlocked"
            document.getElementById("settings").className = "tab unlocked"
            break
        case 6:
            game.tab = id

            document.getElementById("settings_page").style.display = "block"
            document.getElementById("spices_page").style.display = "none"
            document.getElementById("spices_tabs").style.display = "none"
            document.getElementById("prestige_page").style.display = "none"
            document.getElementById("crystal_page").style.display = "none"
            document.getElementById("crystal_page2").style.display = "none"
            document.getElementById("prestige_tabs").style.display = "none"
            document.getElementById("ascension_page").style.display = "none"
            document.getElementById("ascension_page2").style.display = "none"
            document.getElementById("challenges_page").style.display = "none"
            document.getElementById("arcane_page").style.display = "none"
            document.getElementById("ascension_tabs").style.display = "none"
            document.getElementById("collapse_page").style.display = "none"
            document.getElementById("research_page").style.display = "none"
            document.getElementById("challenges_page2").style.display = "none"
            document.getElementById("antispice_page").style.display = "none"
            document.getElementById("collapse_tabs").style.display = "none"
            document.getElementById("statistics_page").style.display = "none"
            document.getElementById("statistics_buttons").style.display = "none"
            document.getElementById("prestige_statistics_page").style.display =
                "none"
            document.getElementById("ascension_statistics_page").style.display =
                "none"
            document.getElementById("collapse_statistics_page").style.display =
                "none"
            document.getElementById("statistics_tabs").style.display = "none"
            document.getElementById("compendium_page").style.display = "none"

            document.getElementById("settings").className = "tab selected"
            document.getElementById("spices").className = "tab unlocked"
            if (
                game.color_boosts >= 10 ||
                game.prestige >= 1 ||
                game.ascend >= 1 ||
                game.collapse >= 1
            )
                document.getElementById("prestige").className = "tab unlocked"
            else document.getElementById("prestige").className = "tab locked"
            if (game.prestige_bought[25])
                document.getElementById("ascension").className = "tab unlocked"
            else document.getElementById("ascension").className = "tab locked"
            if (game.ascend_complete[5])
                document.getElementById("collapse").className = "tab unlocked"
            else document.getElementById("collapse").className = "tab locked"
            document.getElementById("statistics").className = "tab unlocked"
            if (game.compendium_new)
                document.getElementById("compendium").className = "tab notice"
            else
                document.getElementById("compendium").className = "tab unlocked"
            break
        case 7:
            game.tab = id
            game.compendium_new = false

            document.getElementById("compendium_page").style.display = "block"
            document.getElementById("spices_page").style.display = "none"
            document.getElementById("spices_tabs").style.display = "none"
            document.getElementById("prestige_page").style.display = "none"
            document.getElementById("crystal_page").style.display = "none"
            document.getElementById("crystal_page2").style.display = "none"
            document.getElementById("prestige_tabs").style.display = "none"
            document.getElementById("ascension_page").style.display = "none"
            document.getElementById("ascension_page2").style.display = "none"
            document.getElementById("challenges_page").style.display = "none"
            document.getElementById("arcane_page").style.display = "none"
            document.getElementById("ascension_tabs").style.display = "none"
            document.getElementById("collapse_page").style.display = "none"
            document.getElementById("research_page").style.display = "none"
            document.getElementById("challenges_page2").style.display = "none"
            document.getElementById("antispice_page").style.display = "none"
            document.getElementById("collapse_tabs").style.display = "none"
            document.getElementById("statistics_page").style.display = "none"
            document.getElementById("statistics_buttons").style.display = "none"
            document.getElementById("prestige_statistics_page").style.display =
                "none"
            document.getElementById("ascension_statistics_page").style.display =
                "none"
            document.getElementById("collapse_statistics_page").style.display =
                "none"
            document.getElementById("statistics_tabs").style.display = "none"
            document.getElementById("settings_page").style.display = "none"

            document.getElementById("compendium").className = "tab selected"
            document.getElementById("spices").className = "tab unlocked"
            if (
                game.color_boosts >= 10 ||
                game.prestige >= 1 ||
                game.ascend >= 1 ||
                game.collapse >= 1
            )
                document.getElementById("prestige").className = "tab unlocked"
            else document.getElementById("prestige").className = "tab locked"
            if (game.prestige_bought[25])
                document.getElementById("ascension").className = "tab unlocked"
            else document.getElementById("ascension").className = "tab locked"
            if (game.ascend_complete[5])
                document.getElementById("collapse").className = "tab unlocked"
            else document.getElementById("collapse").className = "tab locked"
            document.getElementById("statistics").className = "tab unlocked"
            document.getElementById("settings").className = "tab unlocked"
            break
    }
}

//switching subtabs
function goto_subtab(id) {
    if (game.tab === 0) {
        switch (id) {
            case 0:
                game.subtab[0] = id

                document.getElementById("red_page").style.display = "block"
                document.getElementById("yellow_page").style.display = "none"
                document.getElementById("green_page").style.display = "none"
                document.getElementById("blue_page").style.display = "none"
                document.getElementById("pink_page").style.display = "none"

                document.getElementById("red").className = "subtab selected"
                document.getElementById("yellow").className = "subtab unlocked"
                if (game.color_boosts >= 2)
                    document.getElementById("green").className =
                        "subtab unlocked"
                else
                    document.getElementById("green").className = "subtab locked"
                if (game.color_boosts >= 3)
                    document.getElementById("blue").className =
                        "subtab unlocked"
                else document.getElementById("blue").className = "subtab locked"
                if (game.color_boosts >= 4)
                    document.getElementById("pink").className =
                        "subtab unlocked"
                else document.getElementById("pink").className = "subtab locked"
                break
            case 1:
                game.subtab[0] = id

                document.getElementById("yellow_page").style.display = "block"
                document.getElementById("red_page").style.display = "none"
                document.getElementById("green_page").style.display = "none"
                document.getElementById("blue_page").style.display = "none"
                document.getElementById("pink_page").style.display = "none"

                document.getElementById("yellow").className = "subtab selected"
                document.getElementById("red").className = "subtab unlocked"
                if (game.color_boosts >= 2)
                    document.getElementById("green").className =
                        "subtab unlocked"
                else
                    document.getElementById("green").className = "subtab locked"
                if (game.color_boosts >= 3)
                    document.getElementById("blue").className =
                        "subtab unlocked"
                else document.getElementById("blue").className = "subtab locked"
                if (game.color_boosts >= 4)
                    document.getElementById("pink").className =
                        "subtab unlocked"
                else document.getElementById("pink").className = "subtab locked"
                break
            case 2:
                if (game.color_boosts >= 2) {
                    game.subtab[0] = id

                    document.getElementById("green_page").style.display =
                        "block"
                    document.getElementById("red_page").style.display = "none"
                    document.getElementById("yellow_page").style.display =
                        "none"
                    document.getElementById("blue_page").style.display = "none"
                    document.getElementById("pink_page").style.display = "none"

                    document.getElementById("green").className =
                        "subtab selected"
                    document.getElementById("red").className = "subtab unlocked"
                    document.getElementById("yellow").className =
                        "subtab unlocked"
                    if (game.color_boosts >= 3)
                        document.getElementById("blue").className =
                            "subtab unlocked"
                    else
                        document.getElementById("blue").className =
                            "subtab locked"
                    if (game.color_boosts >= 4)
                        document.getElementById("pink").className =
                            "subtab unlocked"
                    else
                        document.getElementById("pink").className =
                            "subtab locked"
                }
                break
            case 3:
                if (game.color_boosts >= 3) {
                    game.subtab[0] = id

                    document.getElementById("blue_page").style.display = "block"
                    document.getElementById("red_page").style.display = "none"
                    document.getElementById("yellow_page").style.display =
                        "none"
                    document.getElementById("green_page").style.display = "none"
                    document.getElementById("pink_page").style.display = "none"

                    document.getElementById("blue").className =
                        "subtab selected"
                    document.getElementById("red").className = "subtab unlocked"
                    document.getElementById("yellow").className =
                        "subtab unlocked"
                    document.getElementById("green").className =
                        "subtab unlocked"
                    if (game.color_boosts >= 4)
                        document.getElementById("pink").className =
                            "subtab unlocked"
                    else
                        document.getElementById("pink").className =
                            "subtab locked"
                }
                break
            case 4:
                if (game.color_boosts >= 4) {
                    game.subtab[0] = id

                    document.getElementById("pink_page").style.display = "block"
                    document.getElementById("red_page").style.display = "none"
                    document.getElementById("yellow_page").style.display =
                        "none"
                    document.getElementById("green_page").style.display = "none"
                    document.getElementById("blue_page").style.display = "none"

                    document.getElementById("pink").className =
                        "subtab selected"
                    document.getElementById("red").className = "subtab unlocked"
                    document.getElementById("yellow").className =
                        "subtab unlocked"
                    document.getElementById("green").className =
                        "subtab unlocked"
                    document.getElementById("blue").className =
                        "subtab unlocked"
                }
                break
        }
    } else if (game.tab === 1) {
        game.subtab[1] = id

        document.getElementById("prestige_page").style.display = "none"
        document.getElementById("crystal_page").style.display = "none"
        document.getElementById("crystal_page2").style.display = "none"

        switch (id) {
            case 0:
                document.getElementById("prestige_page").style.display = "block"

                document.getElementById("prestige_upgrades").className =
                    "subtab selected"
                document.getElementById("crystallized_spice").className =
                    "subtab unlocked"
                document.getElementById("crystal_upgrades").className =
                    "subtab unlocked"
                break
            case 1:
                document.getElementById("crystal_page").style.display = "block"

                document.getElementById("crystallized_spice").className =
                    "subtab selected"
                document.getElementById("prestige_upgrades").className =
                    "subtab unlocked"
                document.getElementById("crystal_upgrades").className =
                    "subtab unlocked"
                break
            case 2:
                document.getElementById("crystal_page2").style.display = "block"

                document.getElementById("crystal_upgrades").className =
                    "subtab selected"
                document.getElementById("prestige_upgrades").className =
                    "subtab unlocked"
                document.getElementById("crystallized_spice").className =
                    "subtab unlocked"
                break
        }
    } else if (game.tab === 2) {
        switch (id) {
            case 0:
                game.subtab[3] = id

                document.getElementById("ascension_page").style.display =
                    "block"
                document.getElementById("ascension_page2").style.display =
                    "none"
                document.getElementById("challenges_page").style.display =
                    "none"
                document.getElementById("arcane_page").style.display = "none"

                document.getElementById("runes").className = "subtab selected"
                document.getElementById("ascension_upgrades").className =
                    "subtab unlocked"
                if (game.ascend_bought[16])
                    document.getElementById("ascension_challenges").className =
                        "subtab unlocked"
                else
                    document.getElementById("ascension_challenges").className =
                        "subtab locked"
                if (game.ascend_complete[0] && game.ascend_bought[16])
                    document.getElementById("arcane_spice").className =
                        "subtab unlocked"
                else
                    document.getElementById("arcane_spice").className =
                        "subtab locked"
                break
            case 1:
                game.subtab[3] = id

                document.getElementById("ascension_page2").style.display =
                    "block"
                document.getElementById("ascension_page").style.display = "none"
                document.getElementById("challenges_page").style.display =
                    "none"
                document.getElementById("arcane_page").style.display = "none"

                document.getElementById("ascension_upgrades").className =
                    "subtab selected"
                document.getElementById("runes").className = "subtab unlocked"
                if (game.ascend_bought[16])
                    document.getElementById("ascension_challenges").className =
                        "subtab unlocked"
                else
                    document.getElementById("ascension_challenges").className =
                        "subtab locked"
                if (game.ascend_complete[0] && game.ascend_bought[16])
                    document.getElementById("arcane_spice").className =
                        "subtab unlocked"
                else
                    document.getElementById("arcane_spice").className =
                        "subtab locked"
                break
            case 2:
                if (game.ascend_bought[16]) {
                    game.subtab[3] = id

                    document.getElementById("challenges_page").style.display =
                        "block"
                    document.getElementById("ascension_page").style.display =
                        "none"
                    document.getElementById("ascension_page2").style.display =
                        "none"
                    document.getElementById("arcane_page").style.display =
                        "none"

                    document.getElementById("ascension_challenges").className =
                        "subtab selected"
                    document.getElementById("runes").className =
                        "subtab unlocked"
                    document.getElementById("ascension_upgrades").className =
                        "subtab unlocked"
                    if (game.ascend_complete[0] && game.ascend_bought[16])
                        document.getElementById("arcane_spice").className =
                            "subtab unlocked"
                    else
                        document.getElementById("arcane_spice").className =
                            "subtab locked"
                }
                break
            case 3:
                if (game.ascend_complete[0] && game.ascend_bought[16]) {
                    game.subtab[3] = id

                    document.getElementById("arcane_page").style.display =
                        "block"
                    document.getElementById("ascension_page").style.display =
                        "none"
                    document.getElementById("ascension_page2").style.display =
                        "none"
                    document.getElementById("challenges_page").style.display =
                        "none"

                    document.getElementById("arcane_spice").className =
                        "subtab selected"
                    document.getElementById("runes").className =
                        "subtab unlocked"
                    document.getElementById("ascension_upgrades").className =
                        "subtab unlocked"
                    if (game.ascend_bought[16])
                        document.getElementById(
                            "ascension_challenges"
                        ).className = "subtab unlocked"
                    else
                        document.getElementById(
                            "ascension_challenges"
                        ).className = "subtab locked"
                }
                break
        }
    } else if (game.tab === 3) {
        switch (id) {
            case 0:
                game.subtab[4] = id

                document.getElementById("collapse_page").style.display = "block"
                document.getElementById("research_page").style.display = "none"
                document.getElementById("challenges_page2").style.display =
                    "none"
                document.getElementById("antispice_page").style.display = "none"

                document.getElementById("spice_collider").className =
                    "subtab selected"
                document.getElementById("research").className =
                    "subtab unlocked"
                if (game.research_complete[20] >= 1)
                    document.getElementById("collapse_challenges").className =
                        "subtab unlocked"
                else
                    document.getElementById("collapse_challenges").className =
                        "subtab locked"
                if (game.research_complete[21] >= 1)
                    document.getElementById("antispice").className =
                        "subtab unlocked"
                else
                    document.getElementById("antispice").className =
                        "subtab locked"
                break
            case 1:
                game.subtab[4] = id

                document.getElementById("research_page").style.display = "block"
                document.getElementById("collapse_page").style.display = "none"
                document.getElementById("challenges_page2").style.display =
                    "none"
                document.getElementById("antispice_page").style.display = "none"

                document.getElementById("research").className =
                    "subtab selected"
                document.getElementById("spice_collider").className =
                    "subtab unlocked"
                if (game.research_complete[20] >= 1)
                    document.getElementById("collapse_challenges").className =
                        "subtab unlocked"
                else
                    document.getElementById("collapse_challenges").className =
                        "subtab locked"
                if (game.research_complete[21] >= 1)
                    document.getElementById("antispice").className =
                        "subtab unlocked"
                else
                    document.getElementById("antispice").className =
                        "subtab locked"
                break
            case 2:
                if (game.research_complete[20] >= 1) {
                    game.subtab[4] = id

                    document.getElementById("challenges_page2").style.display =
                        "block"
                    document.getElementById("collapse_page").style.display =
                        "none"
                    document.getElementById("research_page").style.display =
                        "none"
                    document.getElementById("antispice_page").style.display =
                        "none"

                    document.getElementById("collapse_challenges").className =
                        "subtab selected"
                    document.getElementById("spice_collider").className =
                        "subtab unlocked"
                    document.getElementById("research").className =
                        "subtab unlocked"
                    if (game.research_complete[21] >= 1)
                        document.getElementById("antispice").className =
                            "subtab unlocked"
                    else
                        document.getElementById("antispice").className =
                            "subtab locked"
                }
                break
            case 3:
                if (game.research_complete[21] >= 1) {
                    game.subtab[4] = id

                    document.getElementById("antispice_page").style.display =
                        "block"
                    document.getElementById("collapse_page").style.display =
                        "none"
                    document.getElementById("research_page").style.display =
                        "none"
                    document.getElementById("challenges_page2").style.display =
                        "none"

                    document.getElementById("antispice").className =
                        "subtab selected"
                    document.getElementById("spice_collider").className =
                        "subtab unlocked"
                    document.getElementById("research").className =
                        "subtab unlocked"
                    if (game.research_complete[20] >= 1)
                        document.getElementById(
                            "collapse_challenges"
                        ).className = "subtab unlocked"
                    else
                        document.getElementById(
                            "collapse_challenges"
                        ).className = "subtab locked"
                }
                break
        }
    } else if (game.tab === 5) {
        switch (id) {
            case 0:
                game.subtab[2] = id

                document.getElementById("statistics_page").style.display =
                    "block"
                document.getElementById("statistics_buttons").style.display =
                    "none"
                document.getElementById(
                    "prestige_statistics_page"
                ).style.display = "none"
                document.getElementById(
                    "ascension_statistics_page"
                ).style.display = "none"
                document.getElementById(
                    "collapse_statistics_page"
                ).style.display = "none"

                document.getElementById("statistics_subtab").className =
                    "subtab selected"
                document.getElementById("past_prestiges").className =
                    "subtab unlocked"
                if (game.ascend >= 1 || game.collapse >= 1)
                    document.getElementById("past_ascensions").className =
                        "subtab unlocked"
                else
                    document.getElementById("past_ascensions").className =
                        "subtab locked"
                if (game.collapse >= 1)
                    document.getElementById("past_collapses").className =
                        "subtab unlocked"
                else
                    document.getElementById("past_collapses").className =
                        "subtab locked"
                break
            case 1:
                game.subtab[2] = id

                document.getElementById(
                    "prestige_statistics_page"
                ).style.display = "block"
                document.getElementById("statistics_buttons").style.display =
                    "flex"
                document.getElementById("statistics_page").style.display =
                    "none"
                document.getElementById(
                    "ascension_statistics_page"
                ).style.display = "none"
                document.getElementById(
                    "collapse_statistics_page"
                ).style.display = "none"

                if (game.statistics_unit[0] === 0) {
                    document.getElementById("statistics_unit").innerHTML =
                        "Unit: RAINBOW SPICE"
                } else if (game.statistics_unit[0] === 1) {
                    document.getElementById("statistics_unit").innerHTML =
                        "Unit: PRESTIGES"
                }

                document.getElementById("past_prestiges").className =
                    "subtab selected"
                document.getElementById("statistics_subtab").className =
                    "subtab unlocked"
                if (game.ascend >= 1 || game.collapse >= 1)
                    document.getElementById("past_ascensions").className =
                        "subtab unlocked"
                else
                    document.getElementById("past_ascensions").className =
                        "subtab locked"
                if (game.collapse >= 1)
                    document.getElementById("past_collapses").className =
                        "subtab unlocked"
                else
                    document.getElementById("past_collapses").className =
                        "subtab locked"
                break
            case 2:
                if (game.ascend >= 1 || game.collapse >= 1) {
                    game.subtab[2] = id

                    document.getElementById(
                        "ascension_statistics_page"
                    ).style.display = "block"
                    document.getElementById(
                        "statistics_buttons"
                    ).style.display = "flex"
                    document.getElementById("statistics_page").style.display =
                        "none"
                    document.getElementById(
                        "prestige_statistics_page"
                    ).style.display = "none"
                    document.getElementById(
                        "collapse_statistics_page"
                    ).style.display = "none"

                    if (game.statistics_unit[1] === 0) {
                        document.getElementById("statistics_unit").innerHTML =
                            "Unit: ANSUZ RUNES"
                    } else if (game.statistics_unit[1] === 1) {
                        document.getElementById("statistics_unit").innerHTML =
                            "Unit: ASCENSIONS"
                    }

                    document.getElementById("past_ascensions").className =
                        "subtab selected"
                    document.getElementById("statistics_subtab").className =
                        "subtab unlocked"
                    document.getElementById("past_prestiges").className =
                        "subtab unlocked"
                    if (game.collapse >= 1)
                        document.getElementById("past_collapses").className =
                            "subtab unlocked"
                    else
                        document.getElementById("past_collapses").className =
                            "subtab locked"
                }
                break
            case 3:
                if (game.collapse >= 1) {
                    game.subtab[2] = id

                    document.getElementById(
                        "collapse_statistics_page"
                    ).style.display = "block"
                    document.getElementById(
                        "statistics_buttons"
                    ).style.display = "flex"
                    document.getElementById("statistics_page").style.display =
                        "none"
                    document.getElementById(
                        "prestige_statistics_page"
                    ).style.display = "none"
                    document.getElementById(
                        "ascension_statistics_page"
                    ).style.display = "none"

                    if (game.statistics_unit[2] === 0) {
                        document.getElementById("statistics_unit").innerHTML =
                            "Unit: ATOMIC SPICE"
                    } else if (game.statistics_unit[2] === 1) {
                        document.getElementById("statistics_unit").innerHTML =
                            "Unit: COLLAPSES"
                    }

                    document.getElementById("past_collapses").className =
                        "subtab selected"
                    document.getElementById("statistics_subtab").className =
                        "subtab unlocked"
                    document.getElementById("past_prestiges").className =
                        "subtab unlocked"
                    document.getElementById("past_ascensions").className =
                        "subtab unlocked"
                }
                break
        }
    }
}

//change past resets unit
function statistics_unit() {
    switch (game.subtab[2]) {
        case 1:
            if (game.statistics_unit[0] === 0) {
                game.statistics_unit[0] = 1
                document.getElementById("statistics_unit").innerHTML =
                    "Unit: PRESTIGES"
            } else {
                game.statistics_unit[0] = 0
                document.getElementById("statistics_unit").innerHTML =
                    "Unit: RAINBOW SPICE"
            }
            break
        case 2:
            if (game.statistics_unit[1] === 0) {
                game.statistics_unit[1] = 1
                document.getElementById("statistics_unit").innerHTML =
                    "Unit: ASCENSIONS"
            } else {
                game.statistics_unit[1] = 0
                document.getElementById("statistics_unit").innerHTML =
                    "Unit: ANSUZ RUNES"
            }
            break
        case 3:
            if (game.statistics_unit[2] === 0) {
                game.statistics_unit[2] = 1
                document.getElementById("statistics_unit").innerHTML =
                    "Unit: COLLAPSES"
            } else {
                game.statistics_unit[2] = 0
                document.getElementById("statistics_unit").innerHTML =
                    "Unit: ATOMIC SPICE"
            }
            break
    }
}

//change past resets time
function statistics_time() {
    if (game.statistics_time === 0) {
        game.statistics_time = 1
        document.getElementById("statistics_time").innerHTML = "Time: REAL TIME"
    } else {
        game.statistics_time = 0
        document.getElementById("statistics_time").innerHTML = "Time: GAME TIME"
    }
}

//change notation
function notation(not) {
    if (not === undefined) {
        game.notation++
        if (game.notation === 5) game.notation = 12
        else if (game.notation === 14) game.notation = 5
        else if (game.notation === 8) {
            if (key.shift) game.notation = 16
            else game.notation = 9
        } else if (game.notation === 17 || game.notation === 18) {
            if (!key.shift) game.notation = 9
        } else if (game.notation === 19) game.notation = 9
        else if (game.notation === 12) game.notation = 14
        else if (game.notation === 15) game.notation = 19
        else if (game.notation === 20) game.notation = 15
        else if (game.notation === 16) game.notation = 2
    } else {
        game.notation = not
    }

    switch (game.notation) {
        case 2:
            document.getElementById("notation").innerHTML =
                "Notation<br>SCIENTIFIC"
            break
        case 3:
            document.getElementById("notation").innerHTML =
                "Notation<br>ENGINEERING"
            break
        case 4:
            document.getElementById("notation").innerHTML =
                "Notation<br>STANDARD"
            break
        case 5:
            document.getElementById("notation").innerHTML =
                "Notation<br>LOGARITHM"
            break
        case 6:
            document.getElementById("notation").innerHTML =
                "Notation<br>LETTERS"
            break
        case 7:
            document.getElementById("notation").innerHTML = "Notation<br>CANCER"
            break
        case 9:
            document.getElementById("notation").innerHTML =
                "Notation<br>INFINITY"
            break
        case 10:
            document.getElementById("notation").innerHTML = "Notation<br>ROMAN"
            break
        case 11:
            document.getElementById("notation").innerHTML = "Notation<br>BASE64"
            break
        case 12:
            document.getElementById("notation").innerHTML =
                "Notation<br>MIXED SCIENTIFIC"
            break
        case 13:
            document.getElementById("notation").innerHTML =
                "Notation<br>MIXED ENGINEERING"
            break
        case 14:
            document.getElementById("notation").innerHTML =
                "Notation<br>IMPERIAL"
            break
        case 15:
            document.getElementById("notation").innerHTML = "Notation<br>RANDOM"
            format_randomize()
            break
        case 16:
            document.getElementById("notation").innerHTML =
                "Notation<br>CANCER (STAGE 2️⃣)"
            break
        case 17:
            document.getElementById("notation").innerHTML =
                "Notation<br>🎀 ℭ𝓪ℕＣє𝐑 (ֆ𝓉αムᴇ 🥉) 🎀"
            break
        case 18:
            document.getElementById("notation").innerHTML = "Notation<br>♋🎬💀"
            break
        case 19:
            document.getElementById("notation").innerHTML = "Notation<br>ARRAY"
            break
    }
}

//toggle hotkeys
function hotkeys() {
    if (game.hotkeys) {
        game.hotkeys = false
        document.getElementById("hotkeys").innerHTML = "Hotkeys<br>DISABLED"
    } else {
        game.hotkeys = true
        document.getElementById("hotkeys").innerHTML = "Hotkeys<br>ENABLED"
    }
}

//toggle condensed generators
function condensed() {
    if (game.condensed) {
        game.condensed = false
        document.getElementById("condensed").innerHTML =
            "Condensed Generators<br>DISABLED"
    } else {
        game.condensed = true
        document.getElementById("condensed").innerHTML =
            "Condensed Generators<br>ENABLED"
    }
}

//toggle various confirmations
function confirmations(type, ignore) {
    switch (type) {
        case "ascend":
            if (game.ascend >= 1 || game.collapse >= 1) {
                document.getElementById("ascend_confirm").className =
                    "settings_button can_modify"
                if (game.ascend_confirm) {
                    game.ascend_confirm = false
                    document.getElementById("ascend_confirm").innerHTML =
                        "Ascension Confirmations<br>DISABLED"
                } else {
                    game.ascend_confirm = true
                    if (game.autoas_toggle && !ignore) auto_toggle("ascend")
                    document.getElementById("ascend_confirm").innerHTML =
                        "Ascension Confirmations<br>ENABLED"
                }
            } else {
                document.getElementById("ascend_confirm").className =
                    "settings_button"
                document.getElementById("ascend_confirm").innerHTML = "?????"
            }
            break
        case "challenge":
            if (game.ascend_bought[16] || game.collapse >= 1) {
                document.getElementById("challenge_confirm").className =
                    "settings_button can_modify"
                if (game.challenge_confirm) {
                    game.challenge_confirm = false
                    document.getElementById("challenge_confirm").innerHTML =
                        "Challenge Confirmations<br>DISABLED"
                } else {
                    game.challenge_confirm = true
                    document.getElementById("challenge_confirm").innerHTML =
                        "Challenge Confirmations<br>ENABLED"
                }
            } else {
                document.getElementById("challenge_confirm").className =
                    "settings_button"
                document.getElementById("challenge_confirm").innerHTML = "?????"
            }
            break
        case "collapse":
            if (game.collapse >= 1) {
                document.getElementById("collapse_confirm").className =
                    "settings_button can_modify"
                if (game.collapse_confirm) {
                    game.collapse_confirm = false
                    document.getElementById("collapse_confirm").innerHTML =
                        "Collapse Confirmations<br>DISABLED"
                } else {
                    game.collapse_confirm = true
                    if (game.autoco_toggle && !ignore) auto_toggle("collapse")
                    document.getElementById("collapse_confirm").innerHTML =
                        "Collapse Confirmations<br>ENABLED"
                }
            } else {
                document.getElementById("collapse_confirm").className =
                    "settings_button"
                document.getElementById("collapse_confirm").innerHTML = "?????"
            }
            break
        case "antispice":
            if (game.research_complete[39] >= 1) {
                document.getElementById("antispice_confirm").className =
                    "settings_button can_modify"
                if (game.antispice_confirm) {
                    game.antispice_confirm = false
                    document.getElementById("antispice_confirm").innerHTML =
                        "Antispice Confirmations<br>DISABLED"
                } else {
                    game.antispice_confirm = true
                    document.getElementById("antispice_confirm").innerHTML =
                        "Antispice Confirmations<br>ENABLED"
                }
            } else {
                document.getElementById("antispice_confirm").className =
                    "settings_button"
                document.getElementById("antispice_confirm").innerHTML = "?????"
            }
            break
    }
}

//change exponent notation
function exponent_notation(not) {
    if (not === undefined) {
        game.exponent_notation++
        if (game.exponent_notation > 3) game.exponent_notation = 0
    } else {
        game.exponent_notation = not
    }

    switch (game.exponent_notation) {
        case 0:
            document.getElementById("exponent_notation").innerHTML =
                "Exponent Notation<br>LONG"
            break
        case 1:
            document.getElementById("exponent_notation").innerHTML =
                "Exponent Notation<br>SCIENTIFIC"
            break
        case 2:
            document.getElementById("exponent_notation").innerHTML =
                "Exponent Notation<br>ENGINEERING"
            break
        case 3:
            document.getElementById("exponent_notation").innerHTML =
                "Exponent Notation<br>STANDARD"
            break
    }
}

//toggle text visibility
function high_visibility() {
    if (game.high_visibility) {
        game.high_visibility = false
        document.getElementById("high_visibility").innerHTML =
            "Text Visibility<br>DEFAULT"
    } else {
        game.high_visibility = true
        document.getElementById("high_visibility").innerHTML =
            "Text Visibility<br>HIGH"
    }
}

//change refresh rate
function refresh_rate(ms) {
    if (ms !== undefined) {
        game.refresh_rate = ms
    } else {
        switch (game.refresh_rate) {
            case 10:
                game.refresh_rate = 20
                break
            case 20:
                game.refresh_rate = 30
                break
            case 30:
                game.refresh_rate = 50
                break
            case 50:
                game.refresh_rate = 100
                break
            case 100:
                game.refresh_rate = 10
                break
        }
    }

    document.getElementById("refresh_rate").innerHTML =
        "Refresh Rate<br>" + game.refresh_rate + " MS"
}

//toggle spice collider animations
function animations() {
    if (game.collapse >= 1) {
        document.getElementById("collider_animation").className =
            "settings_button can_modify"
        if (game.collider_animation) {
            game.collider_animation = false
            document.getElementById("collider_animation").innerHTML =
                "Collider Animations<br>DISABLED"
        } else {
            game.collider_animation = true
            document.getElementById("collider_animation").innerHTML =
                "Collider Animations<br>ENABLED"
        }
    } else {
        document.getElementById("collider_animation").className =
            "settings_button"
        document.getElementById("collider_animation").innerHTML = "?????"
    }
}

//toggle reset resource/min display
function resource_efficiency() {
    if (game.prestige >= 1 || game.ascend >= 1 || game.collapse >= 1) {
        document.getElementById("resource_efficiency").className =
            "settings_button can_modify"
        if (game.resource_efficiency) {
            game.resource_efficiency = false
            document.getElementById("resource_efficiency").innerHTML =
                "Reset Layer Resource/min<br>HIDE"
        } else {
            game.resource_efficiency = true
            document.getElementById("resource_efficiency").innerHTML =
                "Reset Layer Resource/min<br>SHOW"
        }
    } else {
        document.getElementById("resource_efficiency").className =
            "settings_button"
        document.getElementById("resource_efficiency").innerHTML = "?????"
    }
}

//toggle reduced flashing
function reduce_flashing() {
    if (game.prestige >= 1 || game.ascend >= 1 || game.collapse >= 1) {
        document.getElementById("reduce_flashing").className =
            "settings_button can_modify"
        if (game.reduce_flashing) {
            game.reduce_flashing = false
            document.getElementById("reduce_flashing").innerHTML =
                "Reduce Flashing<br>DISABLED"
        } else {
            game.reduce_flashing = true
            document.getElementById("reduce_flashing").innerHTML =
                "Reduce Flashing<br>ENABLED"
        }
    } else {
        document.getElementById("reduce_flashing").className = "settings_button"
        document.getElementById("reduce_flashing").innerHTML = "?????"
    }
}
