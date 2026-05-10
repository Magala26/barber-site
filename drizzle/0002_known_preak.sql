CREATE TABLE `houseCalls` (
	`id` int AUTO_INCREMENT NOT NULL,
	`customerName` varchar(255) NOT NULL,
	`customerEmail` varchar(320),
	`customerPhone` varchar(20) NOT NULL,
	`address` text NOT NULL,
	`serviceIds` text NOT NULL,
	`requestedDate` date NOT NULL,
	`requestedTime` varchar(5) NOT NULL,
	`status` enum('pending','confirmed','completed','cancelled') NOT NULL DEFAULT 'pending',
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `houseCalls_id` PRIMARY KEY(`id`)
);
