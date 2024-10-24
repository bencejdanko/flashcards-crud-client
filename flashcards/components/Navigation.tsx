export function Navigation() {
    return (
        <div className="navbar min-h-0 h-[50px] border-b-[1px] border-secondary text-sm">
            <div className="navbar-start">
                <div class="dropdown focus-within:bg-secondary rounded">
                    <button tabIndex={0} class="m-2 font-bold">
                        Flashcards
                    </button>
                    <ul
                        tabIndex={0}
                        class="border-[1px] shadow-md menu dropdown-content bg-base-100 rounded-box w-52 m-2"
                    >
                        <li>
                            <a>About Flashcards</a>
                        </li>
                        <hr />
                        <li>
                            <a>Account Settings</a>
                        </li>
                        <li>
                            <a>Sign out</a>
                        </li>
                        <hr />
                        <li>
                            <a>Landing Page</a>
                        </li>
                    </ul>
                </div>

                <div class="ml-3 dropdown focus-within:bg-secondary rounded">

                    <button tabIndex={0} class="m-2">Decks</button>
                    <ul
                        tabIndex={0}
                        class="border-[1px] shadow-md menu dropdown-content bg-base-100 rounded-box w-52 m-2"
                    >
                        <li>
                            <div class='flex justify-between'>
                                <a>New Deck</a>
                                <small class='text-secondary'>
                                    Shift-Ctrl-N
                                </small>
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="dropdown focus-within:bg-secondary rounded ml-2">
                    <button tabIndex={0} class="m-2">
                        Help
                    </button>
                    <ul
                        tabIndex={0}
                        class="border-[1px] shadow-md menu dropdown-content bg-base-100 rounded-box w-52 m-2"
                    >
                        <li>
                            <a>Documentation</a>
                        </li>
                        <hr />
                        <li>
                            <a>Feedback</a>
                        </li>
                        <li>
                            <a>Support</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
