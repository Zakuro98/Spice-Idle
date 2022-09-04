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
            document.getElementById("statistics_page").style.display = "none"
            document.getElementById("prestige_statistics_page").style.display =
                "none"
            document.getElementById("statistics_tabs").style.display = "none"
            document.getElementById("settings_page").style.display = "none"

            document.getElementById("spices").className = "tab selected"
            if (game.color_boosts >= 10 || game.prestige >= 1)
                document.getElementById("prestige").className = "tab unlocked"
            else document.getElementById("prestige").className = "tab locked"
            document.getElementById("statistics").className = "tab unlocked"
            document.getElementById("settings").className = "tab unlocked"
            break
        case 1:
            if (game.color_boosts >= 10 || game.prestige >= 1) {
                game.tab = id

                document.getElementById("prestige_page").style.display = "none"
                document.getElementById("crystal_page").style.display = "none"
                document.getElementById("crystal_page2").style.display = "none"
                goto_subtab(game.subtab[1])
                document.getElementById("spices_page").style.display = "none"
                document.getElementById("spices_tabs").style.display = "none"
                document.getElementById("statistics_page").style.display =
                    "none"
                document.getElementById(
                    "prestige_statistics_page"
                ).style.display = "none"
                document.getElementById("statistics_tabs").style.display =
                    "none"
                document.getElementById("settings_page").style.display = "none"

                document.getElementById("prestige").className = "tab selected"
                document.getElementById("spices").className = "tab unlocked"
                document.getElementById("statistics").className = "tab unlocked"
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
            document.getElementById("settings_page").style.display = "none"

            document.getElementById("statistics").className = "tab selected"
            document.getElementById("spices").className = "tab unlocked"
            if (game.color_boosts >= 10 || game.prestige >= 1)
                document.getElementById("prestige").className = "tab unlocked"
            else document.getElementById("prestige").className = "tab locked"
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
            document.getElementById("statistics_page").style.display = "none"
            document.getElementById("prestige_statistics_page").style.display =
                "none"
            document.getElementById("statistics_tabs").style.display = "none"

            document.getElementById("settings").className = "tab selected"
            document.getElementById("spices").className = "tab unlocked"
            if (game.color_boosts >= 10 || game.prestige >= 1)
                document.getElementById("prestige").className = "tab unlocked"
            else document.getElementById("prestige").className = "tab locked"
            document.getElementById("statistics").className = "tab unlocked"
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
    } else if (game.tab === 5) {
        game.subtab[2] = id

        document.getElementById("statistics_page").style.display = "none"
        document.getElementById("prestige_statistics_page").style.display =
            "none"

        switch (id) {
            case 0:
                document.getElementById("statistics_page").style.display =
                    "block"

                document.getElementById("statistics_subtab").className =
                    "subtab selected"
                document.getElementById("past_prestiges").className =
                    "subtab unlocked"
                break
            case 1:
                document.getElementById(
                    "prestige_statistics_page"
                ).style.display = "block"

                document.getElementById("past_prestiges").className =
                    "subtab selected"
                document.getElementById("statistics_subtab").className =
                    "subtab unlocked"
                break
        }
    }
}

//change notation
function notation(not) {
    if (not === undefined) {
        game.notation++
        if (game.notation === 8) game.notation++
        if (game.notation > 13) game.notation = 2
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
