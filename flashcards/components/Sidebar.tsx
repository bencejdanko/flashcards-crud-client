export function Sidebar() {
    return (
        <div class='fixed top-[50px] left-0 w-[200px] h-full bg-secondary flex flex-col align-center'>
            <button class="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                </svg>
                <span>Create Deck</span>
            </button>
        </div>
    );
}
