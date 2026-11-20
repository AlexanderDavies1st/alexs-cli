const terminal = document.querySelector(".terminal");
const output = document.querySelector("samp");
const input = document.getElementById('cmd-input');
const overlay = document.getElementById("overlay");
const activePrompt = document.getElementById("active-prompt");
let user = "user@web"

const commands = {
    help: () => `Avaliable Commands: ${Object.keys(commands).join(", ")}`,
    crt: () => {
        overlay.classList.toggle("hidden");
        return "Successfully Toggled CRT Effect."
    },
    user: (args = []) => {
        const userChange = args.join(" ").trim();
        if (!userChange) return "Syntax: 'user [NewUserName]'"

        user = userChange;
        activePrompt.textContent = `${user}:~$`;
        return `Username Successfully Changed to '${user}'`;
    },
    echo: (args = []) => {
        const txt = args.join(" ").trim();
        return txt
    },
    cls: (args = []) => {
        const arg = args.join(" ").toLowerCase().trim();
        output.innerHTML = '';

        [...terminal.children].forEach(ele => {
            if (!ele.classList.contains("no-del")) {
                ele.remove();
            }
        });

        if (arg == "noreturn") return ""
        return "Successfully Cleared Terminal."
    }
}

function runCommand(e) {
    e.preventDefault();

    const rawInput = input.value.trim();

    appendOutput(`\n${user}:~$ `, "prompt")
    appendOutput(rawInput)
    input.value = '';

    if (!rawInput) return;
    const [rawCmd, ...args] = rawInput.split(' ');
    const cmd = rawCmd.toLowerCase();

    if (commands[cmd]) {
        const response = commands[cmd](args);
        if (response) appendOutput(`\n${response}`);
    } else {
        appendOutput(`\n Command not found: ${cmd}. Type 'help' for options.`, 'error')
    }

    terminal.scrollTop = terminal.scrollHeight;
}

function appendOutput(text, className = '') {
  const span = document.createElement('span');
  if (className) span.className = className;
  span.textContent = text;
  output.appendChild(span);
}